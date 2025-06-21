"use client"

import { CleanPortalLayout } from "@/components/clean-portal-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Send, Search, Phone, Video, MoreVertical, Paperclip } from "lucide-react"

const conversations = [
  {
    id: 1,
    name: "Emma Wilson",
    role: "Personal Trainer",
    lastMessage: "Great job on today's session! Remember to focus on your form during squats.",
    timestamp: "2 hours ago",
    unread: 2,
    avatar: "/placeholder-user.jpg",
    online: true,
  },
  {
    id: 2,
    name: "Support Team",
    role: "Customer Support",
    lastMessage: "Your membership renewal is coming up next week. Would you like to discuss options?",
    timestamp: "1 day ago",
    unread: 0,
    avatar: "/placeholder-user.jpg",
    online: false,
  },
]

const messages = [
  {
    id: 1,
    sender: "Emma Wilson",
    content: "Hi! How are you feeling after yesterday's workout?",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: 2,
    sender: "You",
    content:
      "Hi Emma! I'm feeling good, a bit sore but in a good way. The new exercises were challenging but I enjoyed them.",
    timestamp: "10:45 AM",
    isOwn: true,
  },
  {
    id: 3,
    sender: "Emma Wilson",
    content:
      "That's exactly what we want to hear! The soreness means your muscles are adapting. Make sure to stay hydrated and get enough rest.",
    timestamp: "10:47 AM",
    isOwn: false,
  },
  {
    id: 4,
    sender: "Emma Wilson",
    content:
      "For tomorrow's session, we'll focus on upper body. I've prepared a new routine that will complement what we did yesterday.",
    timestamp: "10:48 AM",
    isOwn: false,
  },
  {
    id: 5,
    sender: "You",
    content: "Sounds great! Should I bring anything specific for tomorrow?",
    timestamp: "11:15 AM",
    isOwn: true,
  },
  {
    id: 6,
    sender: "Emma Wilson",
    content: "Just bring your water bottle and a positive attitude! We have all the equipment we need at the studio.",
    timestamp: "11:20 AM",
    isOwn: false,
  },
]

export default function MessagesPage() {
  return (
    <CleanPortalLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-600 mt-1">Communicate with your trainer and support team</p>
          </div>
        </div>

        {/* Messages Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold text-gray-900">Conversations</CardTitle>
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4" />
                </Button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search conversations..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className="flex items-center space-x-3 p-4 hover:bg-gray-50 cursor-pointer border-l-4 border-l-pink-600"
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600">{conversation.role}</p>
                      <p className="text-sm text-gray-500 truncate mt-1">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-pink-600 hover:bg-pink-700 text-xs">{conversation.unread}</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-2 flex flex-col">
            {/* Chat Header */}
            <CardHeader className="pb-3 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src="/placeholder-user.jpg" />
                      <AvatarFallback>EW</AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Emma Wilson</h3>
                    <p className="text-sm text-green-600">Online now</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isOwn ? "bg-pink-600 text-white" : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p className={`text-xs mt-1 ${message.isOwn ? "text-pink-100" : "text-gray-500"}`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex items-end space-x-2">
                <Button variant="outline" size="sm">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <div className="flex-1">
                  <Textarea
                    placeholder="Type your message..."
                    className="min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                  />
                </div>
                <Button className="bg-pink-600 hover:bg-pink-700">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <MessageSquare className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Start New Conversation</h3>
              <p className="text-sm text-gray-600 mb-4">Reach out to your trainer or support team</p>
              <Button variant="outline" size="sm">
                New Message
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Phone className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Schedule Call</h3>
              <p className="text-sm text-gray-600 mb-4">Book a phone consultation with Emma</p>
              <Button variant="outline" size="sm">
                Book Call
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Video className="h-8 w-8 text-pink-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Video Session</h3>
              <p className="text-sm text-gray-600 mb-4">Join a virtual training session</p>
              <Button variant="outline" size="sm">
                Start Video
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </CleanPortalLayout>
  )
}
