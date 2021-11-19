import React , {useRef,useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContexts';
import axios from 'axios';



const Chats=()=>{

    const history=useHistory();
    const { user } = useAuth();
    const [loading,setLoading] = useState(true);


    const handleLogout=async ()=>{
        await auth.signOut();
        history.push('/');
    }

    const getFile =async(url)=>{
        const response = await fetch(url);
        const data = await response.blob(); 

        return new File([data],"userPhoto.jpg",{type :'image/jpeg'})
    }

    useEffect(()=>{
        if (!user){
            history.push('/');
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers :{
                "project-id" : '3dbe5b66-7750-47d4-80b7-abb11e868450',
                'user-name' : user.email,
                'user-secret' :user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{ 
            let formdata = new FormData();
            formdata.append('email' ,user.email);
            formdata.append('username', user.email);
            formdata.append('secret',user.uid);

            // The reason of using email is because emails are unique so it acts as a primary key

            getFile(user.photoURL)
            .then((avatar)=>{
                formdata.append('avatar',avatar,avatar.name);

                axios.post('https://api.chatengine.io/users/',
                    formdata ,
                    {headers: { "private-key" : '7c4b3c56-ca3b-4cac-bebd-502a7ec62e0f' }}
                )
                .then(() => setLoading(false))
                .catch((error)=> console.log(error))
            })
        })

    },[user,history]);

    if(!user || loading ) return 'Loading...';

    return(
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    UniChat
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    Logout 
                </div>
            </div>
        <ChatEngine
         height='calc(100vh-66px)'
         projectID ='3dbe5b66-7750-47d4-80b7-abb11e868450'
         userName= {user.email}
         userSecret={user.uid}
        />
        </div>
    );
}



export default Chats;