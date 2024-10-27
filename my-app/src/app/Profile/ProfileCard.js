// components/ProfileCard.js

import Image from 'next/image';
import Link from 'next/link';

const ProfileCard = ({user ,id}) => {
    const image=  '/images/image-7.jpg'
    const image1=  '/images/image-6.jpg'
    return (
        <div className="w-full rounded-3xl overflow-hidden shadow-xl max-w-xs my-3 bg-[#3C3D37]">
           
             <div className=' h-56 w-full  bg-[#121212] rounded-3xl shadow-md border-white border-b-2 '>
               <Link href={`/UserEdit/${id}`}> 
             <div className='text-4xl text-white flex justify-end pt-1 pr-1'>
            
                <svg class="feather feather-edit" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></div></Link>
             </div>
            
            <div className=" flex justify-center -mt-8">
                <Image 
                    src={user.image_url}
                    className="rounded-full border-solid border-white border-2 -mt-3" 
                    alt="Profile"
                    width={100} // Set width for the profile image
                    height={10} // Set height for the profile image
                />
            </div>
            <div className="text-center px-3 pb-6 pt-2">
                <h3 className="text-white text-sm font-bold">{user.name}</h3>
                <p className="mt-2 font-light text-white">{user.email}</p>
            </div>
            <div className="flex justify-center pb-3 text-white">
                <div className="text-center mr-3 border-r pr-3">
                    <h2>34</h2>
                    <span>Photos</span>
                </div>
                <div className="text-center">
                    <h2>42</h2>
                    <span>Friends</span>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;