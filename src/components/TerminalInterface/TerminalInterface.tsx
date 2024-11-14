function TerminalInterface() {
  return (
    <section className="flex items-center justify-center w-full h-screen" >
      <div className="bg-gray-800 w-[75%] h-[65%] rounded-2x1">
        <div className="bg-gray-600 w-full h-[10%] rounded-2x1">
          <button type="button"
                  className="text-white bg-red-500 hover:bg-red-700 font-small py-0.5 px-2 mx-3 my-1
                  rounded-full p-2.5 items-center float-right">X</button>
        </div>
        <div className="flex items-center justify-center h-[25%]">
          <pre className="text-white text-center whitespace-pre leading-none mr-10">
            {`
           ____    ____ _____ ______   _____ 
          |_   \\  /   _|_   _|_   _ \`.|_   _|
            |   \\/   |   | |   | | \`. \\ | |  
            | |\\  /| |   | |   | |  | | | |  
           _| |_\\/_| |_ _| |_ _| |_.' /_| |_ 
          |_____||_____|_____|______.'|_____|`}
          </pre>
        </div>
        <br />
        <p className="text-white text-center">{`=========================================================================================`}</p>
      </div>
    </section>
  )
}

export default TerminalInterface;
