import Link from "next/link"
import { Metadata } from "next"
import { FileText, Lock, CreditCard, Receipt, Bell, Eye, Globe, Briefcase, Building2, Gift } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Account Settings | ComsosLiving",
  description: "Manage your ComsosLiving account settings and preferences",
}

const settingsCategories = [
  {
    icon: FileText,
    title: "Personal info",
    description: "Provide personal details and how we can reach you",
    href: "/account/personal-info",
  },
  {
    icon: Lock,
    title: "Login & security",
    description: "Update your password and secure your account",
    href: "/account/security",
  },
  {
    icon: CreditCard,
    title: "Payments & payouts",
    description: "Review payments, payouts, coupons, and gift cards",
    href: "/account/payments",
  },
  {
    icon: Receipt,
    title: "Taxes",
    description: "Manage taxpayer information and tax documents",
    href: "/account/taxes",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Choose notification preferences and how you want to be contacted",
    href: "/account/notifications",
  },
  {
    icon: Eye,
    title: "Privacy & sharing",
    description: "Manage your personal data, connected services, and data sharing settings",
    href: "/account/privacy",
  },
  {
    icon: Globe,
    title: "Global preferences",
    description: "Set your default language, currency, and timezone",
    href: "/account/preferences",
  },
  {
    icon: Briefcase,
    title: "Travel for work",
    description: "Add a work email for business trip benefits",
    href: "/account/business",
  },
  {
    icon: Building2,
    title: "Professional hosting tools",
    description: "Get professional tools if you manage several properties on ComsosLiving",
    href: "/account/hosting-tools",
  },
  {
    icon: Gift,
    title: "Referral credit & coupon",
    description: "You have $50 referral credits and coupon. Learn more.",
    href: "/account/referrals",
  },
]

export default function AccountPage() {
  return (
    <div className="container max-w-6xl py-10">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Account</h1>
          <div className="flex items-baseline gap-2 mt-2">
            <span className="text-lg">John Doe,</span>
            <span className="text-muted-foreground">john.doe@example.com</span>
            <Button variant="link" className="text-primary" asChild>
              <Link href="/account/personal-info">Go to profile</Link>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {settingsCategories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.title} href={category.href}>
                <Card className="h-full p-6 hover:shadow-md transition-shadow cursor-pointer group">
                  <div className="space-y-4">
                    <Icon className="w-8 h-8 text-primary transition-transform group-hover:scale-110" />
                    <div className="space-y-2">
                      <h2 className="font-semibold text-xl">{category.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

