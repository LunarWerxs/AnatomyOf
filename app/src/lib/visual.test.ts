// Pins the geometry formulas layoutTopology/layoutGraph/layoutTimeline compute,
// and visualRefs' first-appearance, deduplicated ref order. Values below are
// hand-derived from the module's own layout constants, so a wrong constant or
// a flipped comparison in the source changes a concrete expected number here.
import { describe, expect, it } from 'vitest'
import type { GraphPanel, TimelinePanel, TopologyPanel } from './types'
import { layoutGraph, layoutTimeline, layoutTopology, visualRefs } from './visual'

describe('layoutTopology', () => {
  it('centers a single plain node in a single zone spanning the full width', () => {
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [{ id: 'z', label: 'Z', nodes: [{ id: 'n', ref: 'r', title: 'N' }] }],
      edges: [],
    }
    const layout = layoutTopology(panel)

    expect(layout.width).toBe(760)
    expect(layout.zones).toEqual([{ id: 'z', label: 'Z', x: 18, y: 40, w: 724, h: 86 }])
    expect(layout.height).toBe(144)
    const [node] = layout.nodes
    expect(node.x).toBe(36)
    expect(node.y).toBe(62)
    expect(node.w).toBe(688)
    expect(node.h).toBe(42)
    expect(node.rowYs).toEqual([])
  })

  it('grows a node for its rows and lays out rowYs from the node top', () => {
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [
        {
          id: 'z',
          label: 'Z',
          nodes: [{ id: 'n', ref: 'r', title: 'N', rows: [{ label: 'a' }, { label: 'b' }] }],
        },
      ],
      edges: [],
    }
    const [node] = layoutTopology(panel).nodes
    expect(node.h).toBe(82) // NODE_PAD*2 + TITLE_H + 6 + 2*ROW_H = 24+18+6+34
    expect(node.rowYs).toEqual([98, 115])
  })

  it('routes a cross-zone edge as a curve, offset by bow, between the two nodes', () => {
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [
        {
          id: 'a',
          label: 'A',
          nodes: [{ id: 'n1', ref: 'r1', title: 'N1', rows: [{ label: 'x' }, { label: 'y' }] }],
        },
        { id: 'b', label: 'B', nodes: [{ id: 'n2', ref: 'r2', title: 'N2', pill: true }] },
      ],
      edges: [{ from: 'n1', to: 'n2', ref: 'e', bow: 5 }],
    }
    const layout = layoutTopology(panel)
    const [edge] = layout.edges

    expect(edge.path).toBe('M342 108 C380 108, 380 108, 418 108')
    expect(edge.labelX).toBe(380)
    expect(edge.labelY).toBe(99)
    expect(edge.labelAnchor).toBe('middle')
  })

  it('routes a same-zone edge vertically, using the LINKED gap and bow-signed label side', () => {
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [
        {
          id: 'z',
          label: 'Z',
          nodes: [
            { id: 'n1', ref: 'r1', title: 'N1' },
            { id: 'n2', ref: 'r2', title: 'N2' },
          ],
        },
      ],
      edges: [{ from: 'n1', to: 'n2', ref: 'e', bow: 3 }],
    }
    const layout = layoutTopology(panel)
    const [edge] = layout.edges

    // Linked zones use the taller 104px gap between stacked nodes.
    expect(layout.nodes[1].y - layout.nodes[0].y).toBe(42 + 104)
    expect(edge.path).toBe('M383 104 L383 208')
    expect(edge.labelX).toBe(392) // bow >= 0 shifts the label right (+9)
    expect(edge.labelAnchor).toBe('start')
  })

  it('drops an edge that references a node id absent from the panel', () => {
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [{ id: 'z', label: 'Z', nodes: [{ id: 'n', ref: 'r', title: 'N' }] }],
      edges: [{ from: 'n', to: 'ghost', ref: 'e' }],
    }
    expect(layoutTopology(panel).edges).toEqual([])
  })
})

describe('layoutGraph', () => {
  const panel: GraphPanel = {
    template: 'graph',
    lanes: [
      { id: 'main', label: 'main' },
      { id: 'feature', label: 'feature' },
    ],
    nodes: [
      { id: 'c1', ref: 'r1', lane: 'main', col: 0 },
      { id: 'c2', ref: 'r2', lane: 'feature', col: 1 },
      { id: 'c3', ref: 'r3', lane: 'main', col: 2 },
    ],
    links: [
      { from: 'c1', to: 'c2', ref: 'l1', arrow: true },
      { from: 'c1', to: 'c3', ref: 'l2' },
    ],
  }

  it('spaces columns evenly across the usable width and places lanes by row', () => {
    const layout = layoutGraph(panel)
    expect(layout.nodes.map((n) => [n.x, n.y])).toEqual([
      [150, 54],
      [435, 140],
      [720, 54],
    ])
    expect(layout.height).toBe(212)
    expect(layout.radius).toBe(9)
  })

  it("bounds each lane's track to the x-extent of the nodes that actually sit in it", () => {
    const [main, feature] = layoutGraph(panel).lanes
    expect(main).toEqual({ id: 'main', label: 'main', y: 54, x1: 150, x2: 720 })
    expect(feature).toEqual({ id: 'feature', label: 'feature', y: 140, x1: 435, x2: 435 })
  })

  it('draws a same-lane link straight and a cross-lane link as a curve', () => {
    const [crossLane, sameLane] = layoutGraph(panel).links
    expect(crossLane.sameLane).toBe(false)
    expect(crossLane.path).toBe('M150 54 C292.5 54, 292.5 140, 435 140')
    expect(crossLane.labelY).toBe(101) // sameLane ? -12 : 4

    expect(sameLane.sameLane).toBe(true)
    expect(sameLane.path).toBe('M150 54 L720 54')
    expect(sameLane.labelY).toBe(42) // sameLane ? -12 : 4
  })

  it('gives a lane with no nodes a null track extent instead of a bogus 0', () => {
    const empty: GraphPanel = {
      template: 'graph',
      lanes: [{ id: 'empty', label: 'Empty' }],
      nodes: [],
      links: [],
    }
    expect(layoutGraph(empty).lanes[0]).toMatchObject({ x1: null, x2: null })
  })
})

describe('layoutTimeline', () => {
  const panel: TimelinePanel = {
    template: 'timeline',
    max: 100,
    unit: 's',
    bars: [
      { id: 'b1', ref: 'r1', label: 'B1', start: 0, end: 50 },
      { id: 'b2', ref: 'r2', label: 'B2', start: 60, end: 65 },
    ],
    markers: [{ at: 80, ref: 'm1', label: 'M1' }],
  }

  it('places bars on successive rows and scales start/end against max', () => {
    const layout = layoutTimeline(panel)
    expect(layout.bars[0]).toMatchObject({ x: 150, y: 52, w: 257 })
    expect(layout.bars[1].y).toBe(90)
    expect(layout.axisY).toBe(144)
  })

  it('clamps a very short bar to a minimum visible width instead of a sliver', () => {
    const tiny: TimelinePanel = {
      template: 'timeline',
      max: 1000,
      bars: [{ id: 'b', ref: 'r', label: 'B', start: 0, end: 1 }],
    }
    // Actual scaled width would be 514/1000 ≈ 0.5px; the floor is 4.
    expect(layoutTimeline(tiny).bars[0].w).toBe(4)
  })

  it('places a marker between the bars and the axis, spanning y1 to y2', () => {
    const [marker] = layoutTimeline(panel).markers
    expect(marker.x).toBeCloseTo(561.2, 5)
    expect(marker.y1).toBe(40)
    expect(marker.y2).toBe(138)
  })

  it('generates 4 evenly spaced ticks (0, 1/3, 2/3, max) labelled with the unit suffix', () => {
    const ticks = layoutTimeline(panel).ticks
    expect(ticks).toHaveLength(4)
    expect(ticks[0]).toEqual({ x: 150, label: '0s' })
    expect(ticks[3]).toEqual({ x: 664, label: '100s' })
    expect(ticks[1].label).toBe('33s')
    expect(ticks[2].label).toBe('67s')
  })

  it('defaults the unit suffix to "s" when the panel omits it', () => {
    const noUnit: TimelinePanel = { template: 'timeline', max: 10, bars: [] }
    expect(layoutTimeline(noUnit).ticks[1].label).toBe('3s')
  })
})

describe('visualRefs', () => {
  it('collects refs in first-appearance order across zones, nodes, rows and edges', () => {
    const panel: TopologyPanel = {
      template: 'topology',
      zones: [
        {
          id: 'a',
          label: 'A',
          nodes: [{ id: 'n1', ref: 'n1ref', title: 'N1', rows: [{ label: 'x', ref: 'rowref' }] }],
        },
      ],
      edges: [{ from: 'n1', to: 'n1', ref: 'edgeref' }],
    }
    expect(visualRefs([panel])).toEqual(['n1ref', 'rowref', 'edgeref'])
  })

  it('deduplicates a ref shared by several elements, keeping only its first position', () => {
    const panel: GraphPanel = {
      template: 'graph',
      lanes: [{ id: 'l', label: 'L' }],
      nodes: [
        { id: 'a', ref: 'shared', lane: 'l', col: 0 },
        { id: 'b', ref: 'other', lane: 'l', col: 1 },
      ],
      links: [{ from: 'a', to: 'b', ref: 'shared' }],
    }
    expect(visualRefs([panel])).toEqual(['shared', 'other'])
  })

  it('omits rows/markers/edges with no ref instead of pushing undefined', () => {
    const panel: TimelinePanel = {
      template: 'timeline',
      max: 10,
      bars: [{ id: 'b', ref: 'barref', label: 'B', start: 0, end: 1 }],
      markers: [],
    }
    expect(visualRefs([panel])).toEqual(['barref'])
  })
})
