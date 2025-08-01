"use client"
import { useUser } from '@/app/provider';
import React, { useEffect, useState } from 'react'
import { supabase } from '@/app/auth/services/supabaseClient';
import { Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InterviewCard from '../dashboard/_components/InterviewCard';

function ScheduledInterview() {

    const { user } = useUser();
    const [interviewList,setInterviewList]=useState();

    useEffect(()=>{
        user&& GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result = await supabase.from('interviews')
        .select('jobPosition,Duration,interview_id,interview-feedback(userEmail)')
        .eq('userEmail', user?.email)
        .order('id', { ascending: false})

        setInterviewList(result.data || []);
    }
  return (
    <div className='mt-5'>
    <h2 className='font-bold text-xl'>Interview List With Candidate Feedback</h2>
        {interviewList?.length==0&&
        <div className='p-5 flex flex-col gap-3 items-center bg-white mt-5 rounded-2xl'>
            <Video className='h-10 w-10 text-primary'/>
            <h2>You dont't have any interview created</h2>
            <Button>+ Create New Interview</Button>
            </div>}
            {interviewList&& <div className='grid grid-cols-2 mt-5 xl:grid-cols-3 gap-5'>
              {interviewList.map((interview,index)=>(
                <InterviewCard interview={interview} key={index} viewDetail={true}/>

              ))}
            
    </div>
}
</div>
  )
}

export default ScheduledInterview