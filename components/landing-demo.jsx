import { demoFlow } from "data/demo-flow"
import { appartmentFlow } from "data/demo-flow"
import WorkFlowCard from 'components/org/workFlowCard';

const LandingDemo = () => {
    return (
        <div>
            <div className="pt-5 flex gap-4 justify-between	">
                {demoFlow.map((flow, i) => (
                    <div key={i}>
                        <WorkFlowCard key={i} flow={flow} />
                    </div>
                ))}
            </div>

            <div className="pt-8 flex gap-4 justify-center	">
                {appartmentFlow.map((flow, i) => (
                    <div key={i}>
                        <WorkFlowCard key={i} flow={flow} />
                    </div>
                ))}
            </div>

        </div>
    )
}

export default LandingDemo; 