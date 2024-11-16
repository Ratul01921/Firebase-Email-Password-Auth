import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { auth } from '../../../firebase.init';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUpBtn = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        const name = e.target.name.value;
        const photo = e.target.photo.value;
        const terms = e.target.terms.checked;
        console.log(email, password, terms, name, photo);
        setErrorMessage('')
        setSuccess(false)
         
        if(!terms){
            setErrorMessage('Please Accept Terms and condition');
            return;

        }
        if (password.length < 6) {
            setErrorMessage('Password should be 6 characters or longer')
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        if (!passwordRegex.test(password)) {
            setErrorMessage('at least one uppercase, one lowercase, one special characters,')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)


            .then((result) => {
                console.log(result.user);
                setSuccess(true)

                // email verification
                sendEmailVerification(auth.currentUser)
                .then(()=> {
                    console.log('Email verification send message');
                })
                .catch((error)=> {
                    console.log(error.message);
                })

                // update profile
                const profile ={
                    displayName: name,
                    photoURL: photo,
                }
                updateProfile(auth.currentUser, profile)
                .then(()=>{
                    console.log('user profile updated');
                })
                .catch((error)=> console.log('user profile updated error'))
            })
            .catch((error) => {
                console.log('ERROR', error.message);
                setErrorMessage(error.message)
                setSuccess(false)
            })
    }
    return (
        <div className='flex items-center justify-center my-8'>
            <div className="text-center  bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">

                <h1 className="text-5xl font-bold">Login now!</h1>
                <form className="card-body" onSubmit={handleSignUpBtn}>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="name" name='name' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Photo Url</span>
                        </label>
                        <input type="text" placeholder="photo url" name='photo' className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" placeholder="email" name='email' className="input input-bordered" required />
                    </div>
                    <div className="form-control relative ">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={showPassword ? 'text' : "password"}
                            placeholder="password" name='password' className="input input-bordered" required />
                        <button onClick={() => setShowPassword(!showPassword)}
                            className='absolute right-4  bottom-12'>
                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }
                        </button>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label justify-start gap-2 cursor-pointer">
                            <input type="checkbox" name='terms' className="checkbox" />
                            <span className="label-text">Terms and Accept condition</span>
                        </label>
                    </div>
                    <div className="form-control mt-6">
                        <button className="btn btn-primary">Login</button>
                    </div>

                </form>
                {
                    errorMessage && <p className=' text-red-600 mb-5'>{errorMessage}</p>
                }
                {
                    success && <p className=' text-green-600 mb-5'>SignUp is Successfully Complete</p>
                }
                <p className='p-4'>Already have an account! Please <Link to='/logIn'>Log In</Link></p>
            </div>
        </div>
    );
};

export default SignUp;