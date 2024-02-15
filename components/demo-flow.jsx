import { demoFlow, appartmentFlow } from 'data/demo-flow';
import WorkFlowCard from 'components/org/workFlowCard';

const DemoFlow = () => (
    <div>
        <div className='pt-5 flex gap-4 justify-between'>
            {demoFlow.map((flow, i) => (
                <div key={i}>
                    <WorkFlowCard key={i} flow={flow} arrow={(i < demoFlow.length - 1)} />
                </div>
            ))}
        </div>

        <div className='pt-8 flex gap-20 justify-center'>
            {appartmentFlow.map((flow, i) => (
                <div key={i}>
                    <WorkFlowCard key={i} flow={flow} arrow={(i < appartmentFlow.length - 1)} />
                </div>
            ))}
        </div>

    </div>
);

export default DemoFlow; 
