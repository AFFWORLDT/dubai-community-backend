"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Book, Calendar, CreditCard, HelpCircle, Home, Lock, Search, Shield, UserCircle } from 'lucide-react'

const helpCategories = [
  {
    id: "getting-started",
    icon: Book,
    title: "Getting Started",
    articles: [
      { id: 1, title: "How to create an account", href: "/help/articles/create-account" },
      { id: 2, title: "Booking your first stay", href: "/help/articles/first-booking" },
      { id: 3, title: "Understanding our fees", href: "/help/articles/fees" },
    ],
  },
  {
    id: "account",
    icon: UserCircle,
    title: "Account & Profile",
    articles: [
      { id: 4, title: "Managing your profile", href: "/help/articles/manage-profile" },
      { id: 5, title: "Account security", href: "/help/articles/security" },
      { id: 6, title: "Payment methods", href: "/help/articles/payment-methods" },
    ],
  },
  {
    id: "bookings",
    icon: Calendar,
    title: "Bookings & Reservations",
    articles: [
      { id: 7, title: "Modifying a booking", href: "/help/articles/modify-booking" },
      { id: 8, title: "Cancellation policy", href: "/help/articles/cancellation" },
      { id: 9, title: "Check-in process", href: "/help/articles/check-in" },
    ],
  },
]

const popularArticles = [
  {
    id: 1,
    title: "Cancellation Policy",
    description: "Learn about our cancellation policies and refund process",
    icon: Calendar,
    href: "/help/articles/cancellation",
  },
  {
    id: 2,
    title: "Payment Security",
    description: "How we keep your payment information safe",
    icon: Lock,
    href: "/help/articles/payment-security",
  },
  {
    id: 3,
    title: "Property Standards",
    description: "Our quality standards for listed properties",
    icon: Home,
    href: "/help/articles/property-standards",
  },
  {
    id: 4,
    title: "Guest Protection",
    description: "Understanding our guest protection program",
    icon: Shield,
    href: "/help/articles/guest-protection",
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className=" py-10">
      <div className="px-4 py-10 mx-auto space-y-10">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold">How can we help you?</h1>
          <p className="text-muted-foreground text-lg">
            Search our help center or browse categories below
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Popular Articles */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Popular Articles</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {popularArticles.map((article) => {
              const Icon = article.icon
              return (
                <Card key={article.id} className="group hover:shadow-md transition-shadow">
                  <Link href={article.href}>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {article.title}
                          </CardTitle>
                          <CardDescription>{article.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                  </Link>
                </Card>
              )
            })}
          </div>
        </section>

        {/* Help Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Browse by Category</h2>
          <Tabs defaultValue="getting-started">
            <TabsList className="w-full justify-start mb-6 overflow-auto">
              {helpCategories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {helpCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-full bg-primary/10 text-primary">
                        <category.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <CardTitle>{category.title}</CardTitle>
                        <CardDescription>
                          Browse articles about {category.title.toLowerCase()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {category.articles.map((article) => (
                        <li key={article.id}>
                          <Link
                            href={article.href}
                            className="flex items-center gap-2 text-muted-foreground hover:text-primary"
                          >
                            <HelpCircle className="h-4 w-4" />
                            {article.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Contact Support */}
        <section className="text-center space-y-4">
          <h2 className="text-2xl font-semibold">Still need help?</h2>
          <p className="text-muted-foreground">
            Our support team is available 24/7 to assist you
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Support</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/chat">Live Chat</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}

