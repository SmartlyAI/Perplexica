'use client';

import { Search } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import useAssistantStore from '@/stores/assistant.stores';
import { useRouter } from 'next/navigation';

interface Discover {
  title: string;
  content: string;
  url: string;
  thumbnail: string;
}

const Page = () => {
  const [skills, setSkills] = useState<any>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://bots.smartly.ai/apis/builder/api/skills`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNTk0ZDIyMTAzYzhiOTEwMDA3ZDNlYWE0Iiwic2tpbGxfaWQiOiJhcGlfdG9rZW4iLCJpYXQiOjE3MzQwMjI2OTF9.imH6ejzZ_BppzDpXEorYlU2jgwFgK-Zk4jhW_r_gGtM'
            // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjc3N2ZlM2Y3ZDMyOTc0MzNlOGRlYTc0Iiwic2tpbGxfaWQiOiJhcGlfdG9rZW4iLCJpYXQiOjE3MzkyMjg3NTh9.scOecsZERL2_fpfDhaj_Tg9tSUo380uqO3h1dIn7nho'
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        console.log(data.skills);

        // data.blogs = data.blogs.filter((blog: Discover) => blog.thumbnail);

        setSkills(data.skills);
      } catch (err: any) {
        console.error('Error fetching data:', err.message);
        toast.error('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const { setUpdateAssistant } = useAssistantStore();
  const Router = useRouter();

  return loading ? (
    <div className="flex flex-row items-center justify-center min-h-screen">
      <svg
        aria-hidden="true"
        className="w-8 h-8 text-light-200 fill-light-secondary dark:text-[#202020] animate-spin dark:fill-[#ffffff3b]"
        viewBox="0 0 100 101"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M100 50.5908C100.003 78.2051 78.1951 100.003 50.5908 100C22.9765 99.9972 0.997224 78.018 1 50.4037C1.00281 22.7993 22.8108 0.997224 50.4251 1C78.0395 1.00281 100.018 22.8108 100 50.4251ZM9.08164 50.594C9.06312 73.3997 27.7909 92.1272 50.5966 92.1457C73.4023 92.1642 92.1298 73.4365 92.1483 50.6308C92.1669 27.8251 73.4392 9.0973 50.6335 9.07878C27.8278 9.06026 9.10003 27.787 9.08164 50.594Z"
          fill="currentColor"
        />
        <path
          d="M93.9676 39.0409C96.393 38.4037 97.8624 35.9116 96.9801 33.5533C95.1945 28.8227 92.871 24.3692 90.0681 20.348C85.6237 14.1775 79.4473 9.36872 72.0454 6.45794C64.6435 3.54717 56.3134 2.65431 48.3133 3.89319C45.869 4.27179 44.3768 6.77534 45.014 9.20079C45.6512 11.6262 48.1343 13.0956 50.5786 12.717C56.5073 11.8281 62.5542 12.5399 68.0406 14.7911C73.527 17.0422 78.2187 20.7487 81.5841 25.4923C83.7976 28.5886 85.4467 32.059 86.4416 35.7474C87.1273 38.1189 89.5423 39.6781 91.9676 39.0409Z"
          fill="currentFill"
        />
      </svg>
    </div>
  ) : (
    <>
      <div className="flex flex-col space-y-6 px-5 pt-8 pb-44 lg:pb-32 md:max-w-3xl lg:max-w-[40rem] xl:max-w-[48rem] mx-auto">
        <div>
          <h1 className="text-3xl font-medium p-2">Assistants</h1>
        </div>

        <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 pb-28 lg:pb-8 w-full justify-items-center lg:justify-items-start">
          {skills &&
            skills?.map((item: any, i: any) => (
              <button
                key={item._id}
                className="cursor-pointer p-4 border border-gray-200 rounded-lg shadow-md w-full text-black dark:text-white lg:text-[16px]  font-[400] truncate transition duration-200"
                onClick={() => {
                  setUpdateAssistant(item._id);
                  Router.push('/');
                }}
              >
                {item.name}
              </button>
            ))}
        </div>
      </div>
    </>
  );
};

export default Page;
