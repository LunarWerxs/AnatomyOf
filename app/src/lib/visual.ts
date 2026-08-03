/**
 * Geometry for the visual templates.
 *
 * Every diagram in src/data is DATA (see VisualDef in types.ts); this module
 * turns that data into coordinates, and the components under components/visual/
 * only draw what it returns. Keeping the maths here is what lets a second entry
 * reuse a template by describing its content instead of drawing it.
 *
 * All three templates lay out inside a fixed 760-unit-wide viewBox, matching the
 * code panel's proportions, and grow vertically to fit.
 */
import type {
  GraphNode,
  GraphPanel,
  TimelinePanel,
  TopologyPanel,
  VisualEdge,
  VisualNode,
  VisualPanelDef,
} from './types'

/** viewBox width every template lays out against. */
export const VIEW_W = 760

/* ── Topology ──────────────────────────────────────────────────────────── */

const PAD = 18
/** Room above the zone rect for its uppercase label. */
const ZONE_LABEL_H = 22
const ZONE_GAP = 40
const ZONE_PAD_X = 18
const ZONE_PAD_Y = 22
const NODE_PAD = 12
const TITLE_H = 18
const SUB_H = 15
const ROW_H = 17
/** Stacked cards in a zone that arrows run between need room for the labels. */
const NODE_GAP_LINKED = 104
const NODE_GAP_CARD = 26
const NODE_GAP_PILL = 9
const PILL_H = 28

export interface LaidNode extends VisualNode {
  x: number
  y: number
  w: number
  h: number
  zone: number
  /** Absolute y of each row, for binding rows to their own annotation. */
  rowYs: number[]
}

export interface LaidZone {
  id: string
  label: string
  x: number
  y: number
  w: number
  h: number
}

export interface LaidEdge extends VisualEdge {
  path: string
  labelX: number
  labelY: number
  labelAnchor: 'start' | 'middle' | 'end'
}

export interface TopologyLayout {
  width: number
  height: number
  zones: LaidZone[]
  nodes: LaidNode[]
  edges: LaidEdge[]
}

function nodeHeight(node: VisualNode): number {
  if (node.pill) return PILL_H
  let h = NODE_PAD + TITLE_H
  if (node.sub) h += SUB_H
  if (node.rows?.length) h += 6 + node.rows.length * ROW_H
  return h + NODE_PAD
}

export function layoutTopology(panel: TopologyPanel): TopologyLayout {
  const zoneCount = panel.zones.length
  const zoneW = (VIEW_W - PAD * 2 - ZONE_GAP * (zoneCount - 1)) / zoneCount
  const nodeW = zoneW - ZONE_PAD_X * 2

  // A zone whose own nodes are joined by an arrow needs the taller gap, so the
  // arrow and its label have somewhere to go.
  const zoneOf = new Map<string, number>()
  panel.zones.forEach((zone, i) => {
    for (const node of zone.nodes) zoneOf.set(node.id, i)
  })
  const linkedZones = new Set<number>()
  for (const edge of panel.edges) {
    const a = zoneOf.get(edge.from)
    const b = zoneOf.get(edge.to)
    if (a !== undefined && a === b) linkedZones.add(a)
  }

  const gapFor = (zoneIndex: number, nodes: VisualNode[]) =>
    linkedZones.has(zoneIndex)
      ? NODE_GAP_LINKED
      : nodes.every((n) => n.pill)
        ? NODE_GAP_PILL
        : NODE_GAP_CARD

  const contentHeights = panel.zones.map((zone, i) => {
    const gap = gapFor(i, zone.nodes)
    return (
      zone.nodes.reduce((sum, n) => sum + nodeHeight(n), 0) +
      gap * Math.max(0, zone.nodes.length - 1)
    )
  })
  const zoneH = Math.max(...contentHeights) + ZONE_PAD_Y * 2
  const zoneY = PAD + ZONE_LABEL_H
  const height = zoneY + zoneH + PAD

  const zones: LaidZone[] = panel.zones.map((zone, i) => ({
    id: zone.id,
    label: zone.label,
    x: PAD + i * (zoneW + ZONE_GAP),
    y: zoneY,
    w: zoneW,
    h: zoneH,
  }))

  const nodes: LaidNode[] = []
  panel.zones.forEach((zone, i) => {
    const gap = gapFor(i, zone.nodes)
    // Vertically centred, so a one-node zone lines up with a two-node one.
    let y = zoneY + (zoneH - contentHeights[i]) / 2
    for (const node of zone.nodes) {
      const h = nodeHeight(node)
      const rowTop = y + NODE_PAD + TITLE_H + (node.sub ? SUB_H : 0) + 6
      nodes.push({
        ...node,
        zone: i,
        x: zones[i].x + ZONE_PAD_X,
        y,
        w: nodeW,
        h,
        rowYs: (node.rows ?? []).map((_, r) => rowTop + r * ROW_H),
      })
      y += h + gap
    }
  })

  const byId = new Map(nodes.map((n) => [n.id, n]))
  const edges: LaidEdge[] = []
  for (const edge of panel.edges) {
    const from = byId.get(edge.from)
    const to = byId.get(edge.to)
    if (!from || !to) continue
    const bow = edge.bow ?? 0

    if (from.zone === to.zone) {
      // Vertical run inside one zone; `bow` shifts it sideways so an up and a
      // down arrow between the same pair sit apart.
      const x = from.x + from.w / 2 + bow
      const down = from.y < to.y
      const sy = down ? from.y + from.h : from.y
      const ey = down ? to.y : to.y + to.h
      edges.push({
        ...edge,
        path: `M${x} ${sy} L${x} ${ey}`,
        labelX: x + (bow >= 0 ? 9 : -9),
        labelY: (sy + ey) / 2 + 4,
        labelAnchor: bow >= 0 ? 'start' : 'end',
      })
      continue
    }

    // Between zones: leave one side, enter the other, `bow` shifts both anchors.
    const leftToRight = from.zone < to.zone
    const sx = leftToRight ? from.x + from.w : from.x
    const ex = leftToRight ? to.x : to.x + to.w
    const sy = from.y + from.h / 2 + bow
    const ey = to.y + to.h / 2 + bow
    const dx = (ex - sx) / 2
    edges.push({
      ...edge,
      path: `M${sx} ${sy} C${sx + dx} ${sy}, ${ex - dx} ${ey}, ${ex} ${ey}`,
      labelX: (sx + ex) / 2,
      labelY: (sy + ey) / 2 - 9,
      labelAnchor: 'middle',
    })
  }

  return { width: VIEW_W, height, zones, nodes, edges }
}

/* ── Graph ─────────────────────────────────────────────────────────────── */

const GRAPH_TOP = 54
const LANE_GAP = 86
const GRAPH_LEFT = 150
const GRAPH_RIGHT = 40
const NODE_R = 9

export interface LaidGraphNode extends GraphNode {
  x: number
  y: number
}

export interface LaidGraphLink {
  from: string
  to: string
  ref: string
  label?: string
  arrow?: boolean
  path: string
  labelX: number
  labelY: number
  /** Straight runs inside one lane are drawn as the lane's own track. */
  sameLane: boolean
}

export interface LaidGraphLane {
  id: string
  label: string
  y: number
  /** Extent of the lane's own track, or null when it holds no nodes. */
  x1: number | null
  x2: number | null
}

export interface GraphLayout {
  width: number
  height: number
  lanes: LaidGraphLane[]
  nodes: LaidGraphNode[]
  links: LaidGraphLink[]
  radius: number
}

export function layoutGraph(panel: GraphPanel): GraphLayout {
  const maxCol = Math.max(1, ...panel.nodes.map((n) => n.col))
  const colGap = (VIEW_W - GRAPH_LEFT - GRAPH_RIGHT) / maxCol
  const laneY = new Map(panel.lanes.map((lane, i) => [lane.id, GRAPH_TOP + i * LANE_GAP]))

  const nodes: LaidGraphNode[] = panel.nodes.map((n) => ({
    ...n,
    x: GRAPH_LEFT + n.col * colGap,
    y: laneY.get(n.lane) ?? GRAPH_TOP,
  }))

  const lanes: LaidGraphLane[] = panel.lanes.map((lane) => {
    const own = nodes.filter((n) => n.lane === lane.id)
    return {
      id: lane.id,
      label: lane.label,
      y: laneY.get(lane.id) ?? GRAPH_TOP,
      x1: own.length ? Math.min(...own.map((n) => n.x)) : null,
      x2: own.length ? Math.max(...own.map((n) => n.x)) : null,
    }
  })

  const byId = new Map(nodes.map((n) => [n.id, n]))
  const links: LaidGraphLink[] = []
  for (const link of panel.links) {
    const from = byId.get(link.from)
    const to = byId.get(link.to)
    if (!from || !to) continue
    const sameLane = from.lane === to.lane
    const dx = (to.x - from.x) / 2
    links.push({
      ...link,
      sameLane,
      path: sameLane
        ? `M${from.x} ${from.y} L${to.x} ${to.y}`
        : `M${from.x} ${from.y} C${from.x + dx} ${from.y}, ${to.x - dx} ${to.y}, ${to.x} ${to.y}`,
      labelX: (from.x + to.x) / 2,
      labelY: (from.y + to.y) / 2 + (sameLane ? -12 : 4),
    })
  }

  const height = GRAPH_TOP + (panel.lanes.length - 1) * LANE_GAP + 72
  return { width: VIEW_W, height, lanes, nodes, links, radius: NODE_R }
}

/* ── Timeline ──────────────────────────────────────────────────────────── */

const TL_TOP = 52
const TL_ROW = 38
const TL_LEFT = 150
const TL_RIGHT = 96
const BAR_H = 20

export interface LaidBar {
  id: string
  ref: string
  label: string
  note?: string
  x: number
  y: number
  w: number
  labelY: number
}

export interface LaidMarker {
  ref: string
  label: string
  x: number
  y1: number
  y2: number
}

export interface TimelineLayout {
  width: number
  height: number
  bars: LaidBar[]
  markers: LaidMarker[]
  axisY: number
  ticks: Array<{ x: number; label: string }>
}

export function layoutTimeline(panel: TimelinePanel): TimelineLayout {
  const span = VIEW_W - TL_LEFT - TL_RIGHT
  const x = (t: number) => TL_LEFT + (t / panel.max) * span
  const unit = panel.unit ?? 's'

  const bars: LaidBar[] = panel.bars.map((bar, i) => {
    const y = TL_TOP + i * TL_ROW
    return {
      id: bar.id,
      ref: bar.ref,
      label: bar.label,
      note: bar.note,
      x: x(bar.start),
      y,
      w: Math.max(4, x(bar.end) - x(bar.start)),
      labelY: y + BAR_H - 6,
    }
  })

  const axisY = TL_TOP + panel.bars.length * TL_ROW + 16
  const markers: LaidMarker[] = (panel.markers ?? []).map((m) => ({
    ref: m.ref,
    label: m.label,
    x: x(m.at),
    y1: TL_TOP - 12,
    y2: axisY - 6,
  }))

  const tickCount = 3
  const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
    const t = (panel.max / tickCount) * i
    return { x: x(t), label: `${Math.round(t)}${unit}` }
  })

  return { width: VIEW_W, height: axisY + 34, bars, markers, axisY, ticks }
}

/* ── Shared ────────────────────────────────────────────────────────────── */

/** Every annotation id a visual block references, in first-appearance order. */
export function visualRefs(panels: VisualPanelDef[]): string[] {
  const refs: string[] = []
  const add = (ref?: string) => {
    if (ref && !refs.includes(ref)) refs.push(ref)
  }
  for (const panel of panels) {
    if (panel.template === 'topology') {
      for (const zone of panel.zones) {
        for (const node of zone.nodes) {
          add(node.ref)
          for (const row of node.rows ?? []) add(row.ref)
        }
      }
      for (const edge of panel.edges) add(edge.ref)
    } else if (panel.template === 'graph') {
      for (const node of panel.nodes) add(node.ref)
      for (const link of panel.links) add(link.ref)
    } else {
      for (const bar of panel.bars) add(bar.ref)
      for (const marker of panel.markers ?? []) add(marker.ref)
    }
  }
  return refs
}
