import React from 'react';

interface ApplicationProps {
	iconPath: string; 
	appText: string;
	windowContent: React.FC; 
	onClick: (windowContent: React.FC) => void;
}
const Application: React.FC<ApplicationProps> = ({iconPath, appText, windowContent, onClick}) => {
	return (
		<div className='flex flex-col items-center'>
			<button onDoubleClick={ () => {onClick(windowContent)} }>
				<img
					className='relative w-32 h-32 p-2 object-contain max-w-full'
					src={iconPath}
					alt="Application Icon"
				/>
				<p className="max-w-32 text-center mt-2 break-words">{appText}</p>
			</button>
		</div>
	)
};
export default Application