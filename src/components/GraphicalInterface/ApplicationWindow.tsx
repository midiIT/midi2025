import { ReactNode } from "react";

interface ApplicationWindowProps {
	content: ReactNode; 
	onExit: () => void;
}
const ApplicationWindow: React.FC<ApplicationWindowProps> = ({content, onExit}) => {
	return (
		<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-gray-700 z-2 p-2'>
			<div className='relative h-10'>
				<button 
					className='absolute top-2 right-2 w-8 h-8 bg-red-500 text-white rounded font-bold'
					onClick={onExit}
				>
					X
				</button>
			</div>
			{content}
		</div>
	)
};
export default ApplicationWindow