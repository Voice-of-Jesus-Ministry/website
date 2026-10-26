import { StudyWorkspace } from "../../components/StudyWorkspace";
export default function Tools() {
  return (
    <div className="container page narrow">
      <p className="eyebrow">YOUR WORKSPACE</p>
      <h1>Make room for your ideas.</h1>
      <p className="lede">
        A simple place to reflect, prepare for Bible study, and keep what you
        discover. No cloud account needed.
      </p>
      <StudyWorkspace />
    </div>
  );
}
