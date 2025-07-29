"use client"
import { useEffect } from 'react';
import React ,{ useState}from 'react'
import { useUser } from '@/app/provider';
import { supabase } from '@/app/auth/services/supabaseClient';
import { Button } from '@/components/ui/button';
import { Video } from 'lucide-react';
import InterviewCard from '../dashboard/_components/InterviewCard';
import { motion } from 'framer-motion';
import moment from 'moment';
import { Copy,Send } from 'lucide-react';

function AllInterview({interview}) {
      const [interviewList,setInterviewList] = useState([]);
    const {user} = useUser();

    useEffect(()=>{
     user && GetInterviewList();
    },[user])
    const GetInterviewList=async()=>{
      let { data: Interviews , error} = await supabase
      .from('interviews')
      .select('*')
      .eq('userEmail',user?.email)
      .order('id', {ascending: false });
      console.log(Interviews);
      setInterviewList(Interviews);
    }

 
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'>All Previously Created Interviews</h2>
        {interviewList?.length==0&&
        <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-2xl'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You dont't have any interview created</h2>
            <Button>+ Create New Interview</Button>
            </div>}
            {interviewList&& <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
              {interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index}/>

              ))}
              </div>
              }
    </div>
  )
}

export default AllInterview