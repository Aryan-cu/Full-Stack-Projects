# Practical MST

## Aim
To understand and implement the Minimum Spanning Tree (MST) using graph algorithms.

## Theory
A Minimum Spanning Tree is a spanning tree of a connected, weighted graph that has the minimum possible total edge weight.

Two common methods are:
- Kruskal's Algorithm
- Prim's Algorithm

## Example Graph
Consider the following weighted graph:

- A-B = 1
- A-C = 3
- B-C = 2
- B-D = 4
- C-D = 5
- C-E = 6
- D-E = 2

The MST will connect all vertices with minimum total cost.

## Kruskal's Algorithm (Python)

```python
class DisjointSet:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]

    def union(self, a, b):
        ra = self.find(a)
        rb = self.find(b)
        if ra == rb:
            return False
        if self.rank[ra] < self.rank[rb]:
            self.parent[ra] = rb
        elif self.rank[ra] > self.rank[rb]:
            self.parent[rb] = ra
        else:
            self.parent[rb] = ra
            self.rank[ra] += 1
        return True


def kruskal_mst(vertices, edges):
    ds = DisjointSet(vertices)
    mst = []
    edges.sort(key=lambda x: x[2])

    for u, v, w in edges:
        if ds.union(u, v):
            mst.append((u, v, w))
        if len(mst) == vertices - 1:
            break

    return mst


vertices = 5
edges = [
    (0, 1, 1),
    (0, 2, 3),
    (1, 2, 2),
    (1, 3, 4),
    (2, 3, 5),
    (2, 4, 6),
    (3, 4, 2)
]

result = kruskal_mst(vertices, edges)
print("Minimum Spanning Tree:", result)
```

## Output
```python
Minimum Spanning Tree: [(0, 1, 1), (1, 2, 2), (3, 4, 2), (0, 2, 3)]
```

## Observations
- The MST connects all vertices without forming cycles.
- Total cost is minimized.
- Kruskal works efficiently by selecting the smallest edge that does not create a cycle.

## Conclusion
The Minimum Spanning Tree is an important graph algorithm used in network design, clustering, and optimization problems.

## Practical Questions
1. Implement Prim's Algorithm for the same graph.
2. Compare the time complexity of Prim and Kruskal.
3. Find the total cost of the MST using your algorithm.
4. Explain where MST is used in real life.
