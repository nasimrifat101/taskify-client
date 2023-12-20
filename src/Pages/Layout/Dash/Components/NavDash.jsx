/* eslint-disable react/prop-types */
import { useForm } from "react-hook-form";
import { FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from "react";

const NavDash = ({ title, btn, profile }) => {
    const [selectedDate, setSelectedDate] = useState(null);

    const {
        register,
        setValue,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const onSubmit = async (data) => {
        data.deadline = selectedDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          });
        console.log("Form Data:", data);

    }


    return (
        <div>
            <div className="navbar bg-base-300">
                <div className="navbar-start">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={profile} />
                            </div>
                        </div>

                    </div>
                    <a className="btn btn-ghost text-xl">{title}</a>
                </div>

                <div className="navbar-end space-x-1">
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn" onClick={() => document.getElementById('my_modal_2').showModal()}>{btn}</button>
                    <dialog id="my_modal_2" className="modal">
                        <div className="modal-box">
                            {/* things go here */}

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        {...register("title", { required: "Title is required" })}
                                        placeholder="Task Title"
                                        className="input input-bordered"
                                    />
                                </div>
                                <div className="form-control w-full">
                                    <input
                                        type="text"
                                        {...register("description", { required: 'Description is required' })}
                                        placeholder="Task Description"
                                        className="input input-bordered"
                                    />

                                </div>
                                <div className="flex space-x-1">
                                    <div className="form-control w-full">
                                        <DatePicker
                                            {...register("deadline", {
                                                required: 'Deadline is required',
                                                validate: {
                                                    isNotPast: value => new Date(value) > new Date(),
                                                },
                                            })}
                                            selected={selectedDate}
                                            onChange={(date) => {
                                                setSelectedDate(date);
                                                setValue("deadline", date, { shouldValidate: true });
                                            }}
                                            placeholderText="Select Deadline"
                                            dateFormat="dd MMM yyyy" 
                                            minDate={new Date()}
                                            className="input input-bordered"
                                        />
                                        {errors.deadline && <span className="text-error">{errors.deadline.message}</span>}
                                    </div>
                                    <div className="form-control w-full">
                                        <select
                                            {...register("priority", { required: 'Priority is required' })}
                                            className="input input-bordered"
                                        >
                                            <option value="" disabled>Select Priority</option>
                                            <option value="low">Low</option>
                                            <option value="moderate">Moderate</option>
                                            <option value="high">High</option>
                                        </select>
                                        {errors.priority && <span className="text-error">{errors.priority.message}</span>}
                                    </div>
                                </div>
                                <input type="submit" value="Login" className="btn w-full" />

                            </form>




                        </div>
                        <form method="dialog" className="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>


                    <NavLink to='/' className="btn"><FaHome /></NavLink>
                </div>
            </div>
        </div>
    );
};

export default NavDash;