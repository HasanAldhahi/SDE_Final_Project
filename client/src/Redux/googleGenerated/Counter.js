
import { increment, decrement, incrementByAmount } from "./formSlice"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'



const Counter = () => {

    const count = useSelector((state) => {

      console.log(state)
      console.log(state.counter)

       return( 
         
         state.counter.value
         
         );

    })

   
   
 const dispatch = useDispatch();
  return (
    <>

       <section className="text-gray-600 body-font py-8">
      <div className="container px-5 py-24 mx-auto"></div>
      <h1>the count is {count} </h1>
        <p>{count}</p>
        <div>
            <div>
               {console.log(count)}

               <button  className="text-white back-main px-[20px] py-[15px] mt-10 rounded-md text-[25px] hover:bg-blue-400 active:bg-blue-500 transition-all"
            onClick={()=> dispatch(increment())} >
            +
         </button>
             </div>
        <button  className="text-white back-main px-[50px] py-[10px] mt-10 rounded-md text-[25px] hover:bg-blue-400 active:bg-blue-500 transition-all"
            onClick={()=> dispatch(decrement())} >
            -
         </button>
        </div>
    <div/>
    </section>
    
    </>
  )
}


export  default Counter