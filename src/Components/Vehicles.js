import React, { useState, useEffect } from 'react'
import VehicleServices from '../services/VehicleServices'
import Vehicle from './Vehicle'
import { useGlobalContext } from '../context/Context'
import '../css/Vehicles.css'

const Vehicles = () => {
  const [vehicles, setVehicles] = useState([])
  const { isLoading, setIsLoading } = useGlobalContext()

  useEffect(() => {
    VehicleServices.getAllVehicles().then(data => {
      setVehicles(data.message.vehicles)
      setIsLoading(false)
      console.log(data);
    })
  }, [])

  if (isLoading) {
    return <h2>Loading...</h2>
  } else {
    return (
      <section className='vehicles'>
        <div className='vehicles-container'>
          {
            vehicles.map((vehicle, index) => {
              return (
                <Vehicle key={index} {...vehicle} />
              )
            })
          }
        </div>
      </section>
    )
  } 
}

export default Vehicles