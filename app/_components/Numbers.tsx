import { Counter } from "./Counter";
import { Reveal } from "./Reveal";
import { numbers } from "@/app/_content/numbers";

/** T4 stat strip on navy. Figures count in on entry. Values are placeholders until the client supplies real ones. */
export function Numbers() {
  return (
    <section className="strip numbers" aria-labelledby="numbers-title">
      <div className="wrap strip__inner">
        <h2 id="numbers-title" className="strip__sign" data-split>
          {numbers.title}
        </h2>
        <dl className="strip__cells strip__cells--4">
          {numbers.cells.map((cell, i) => (
            <Reveal as="div" className="strip__cell" key={cell.label} delay={0.1 + i * 0.1}>
              <dt className="strip__figure">
                <Counter value={cell.value} suffix={"suffix" in cell ? cell.suffix : ""} />
              </dt>
              <dd>{cell.label}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
