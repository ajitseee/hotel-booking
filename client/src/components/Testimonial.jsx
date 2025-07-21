import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import Starrating from './Starrating'

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 pt-20 pb-30'>
      <Title title="What Our Guests Say" subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."/>

      <div className="flex flex-wrap items-center justify-center gap-6 mt-20 mb-10">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow max-w-sm w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                                <div>
                                    <p className="font-playfair text-lg font-medium">{testimonial.name}</p>
                                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                                </div>
                            </div>
                            <Starrating rating={testimonial.rating} />
                        </div>

                        <p className="text-gray-500 mt-4">"{testimonial.review}"</p>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Testimonial