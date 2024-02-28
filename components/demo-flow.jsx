import { demoFlow, appartmentFlow } from 'data/demo-flow';
import WorkFlowCard from 'components/org/workFlowCard';

const DemoFlow = () => (
    <div>
        <div className='ta-l mb-5'>
            <h1 className='text-2xl text-slate-700 font-semibold'>Demo Flow</h1>
        </div>
        <div className='pt-5 flex justify-between flex-wrap'>
            {demoFlow.map((flow, i) => (
                <div className='w-full xl:w-fit md:w-fit m-auto' key={i}>
                    <WorkFlowCard key={i} flow={flow} arrow={(i < demoFlow.length - 1)} />
                </div>
            ))}
        </div>

        <div className='pt-8 flex gap-10 justify-center flex-wrap'>
            {appartmentFlow.map((flow, i) => (
                <div className='w-full xl:w-fit md:w-fit' key={i}>
                    <WorkFlowCard key={i} flow={flow} arrow={(i < appartmentFlow.length - 1)} />
                </div>
            ))}
        </div>

    </div>
);

export default DemoFlow; 
