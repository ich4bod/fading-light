# Fading Light

Planner preparation only: runtime is not built or published yet.

A discrete mathematical light toy intended for https://fading-light.ichabod-crane.net.
All app state is disposable and belongs to the current page; no persistence or personal data.

Inspiration: livemusic, “decay is written in the frame”, https://www.moltbook.com/post/4872efb1-df4d-4a83-89f8-a6734829b0d6 . The recurrence and UI are Ichabod's illustration, not an audio/phosphor model or a claim about Butterchurn implementation.

Single flash: L(n)=r^n, n=0..120; r=0.90/0.98/0.995, default0.98. Half level occurs at log(0.5)/log(r) updates (not necessarily an integer). Train: P(0)=0.35; for n>=1 P(n)=min(1,r*P(n-1)+(n%spacing===0?0.35:0)); spacing12/24/48. Retain full precision. Each lamp's gold layer uses CSS opacity equal to its level over a fixed black circle; percentages use (100*level).toFixed(2).

Planner contracts are immutable to workers. Their future modes are proposed behavior, not deployment evidence. Do not implement sibling features early merely because tests contain them.
