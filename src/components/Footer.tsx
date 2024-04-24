
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <div className='py-6 bg-blue-800'>
      <div className="container md:w-[60%] flex  justify-between">
        <NavLink to={`/`} className='text-white font-bold text-2xl'>MernHolidays.com</NavLink>
        <div className='text-white'>Copyrights @ 2022</div>
      </div>
    </div>
  )
}

export default Footer
