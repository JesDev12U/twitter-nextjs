'use client'
import {Card, CardHeader, CardBody, CardFooter, Avatar} from "@heroui/react";
import { IconMessageCircle, IconHeart, IconRepeat } from '@tabler/icons-react'

interface PostCardProps {
  userFullName: string
  username: string
  avatarUrl: string
  content: string
}

export default function PostCard({
  userFullName,
  username,
  avatarUrl,
  content,
}: PostCardProps) {
  return (
    <Card className="shadow-none bg-transparent transition border-b rounded-none cursor-pointer border-white/20">
      <CardHeader className="justify-between">
        <div className="flex gap-x-2">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={avatarUrl}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">{userFullName}</h4>
            <h5 className="text-small tracking-tight text-default-400">@{username}</h5>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-3 py-0 text-small text-white-400">
        <p>{ content }</p>
      </CardBody>
      <CardFooter className='gap-3'>
        <button>
          <IconMessageCircle className='w-4 h-4' />
        </button>
        <button>
          <IconHeart className='w-4 h-4' />
        </button>
        <button>
          <IconRepeat className='w-4 h-4' />
        </button>
      </CardFooter>
    </Card>
  );
}

