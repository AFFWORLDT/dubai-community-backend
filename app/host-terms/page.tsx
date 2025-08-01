"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  FileText, 
  Shield, 
  DollarSign, 
  Calendar, 
  MessageSquare, 
  Gavel, 
  AlertTriangle, 
  Scale, 
  Power, 
  Edit, 
  Globe, 
  Mail,
  UserCheck,
  Eye
} from "lucide-react"

const PolicySection = ({ title, icon, children }: any) => (
  <Card className="border-none shadow-lg">
    <CardHeader>
      <CardTitle className="text-2xl flex items-center gap-2">
        {icon}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
)

export default function HostTermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full px-4 py-32">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">Host Registration Terms and Conditions</h1>
          <div className="flex flex-col sm:flex-row gap-2 justify-center items-center">
            <Badge variant="outline">Platform: Mybookings.ae</Badge>
          </div>
        </div>

        <ScrollArea className="space-y-6">
          {/* Introduction */}
          <Card className="border-none shadow-lg bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="pt-6">
              <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
                These Terms and Conditions ("Agreement") govern the registration and listing of properties by individuals or businesses ("Host", "you", "your") on the Mybookings.ae platform. By registering as a Host, you agree to be bound by these terms, as well as our Privacy Policy and any other applicable policies.
              </p>
            </CardContent>
          </Card>

          {/* Host Eligibility */}
          <PolicySection 
            title="Host Eligibility and Registration" 
            icon={<UserCheck className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Age Requirement</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">You must be at least 18 years old and legally authorized to manage or sublease the property listed.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Information Accuracy</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">You must provide accurate personal and property information including valid identification, proof of ownership or authorization, and contact details.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Approval Rights</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Mybookings.ae reserves the right to approve or reject any registration without obligation to provide justification.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Property Listings */}
          <PolicySection 
            title="Property Listings" 
            icon={<FileText className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Accurate Information</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">You agree to provide accurate, complete, and updated information about the property, including photos, amenities, location, pricing, and availability.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Host Responsibility</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">The Host is solely responsible for the content and accuracy of the listing.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Standards Compliance</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Properties must meet basic health, safety, and cleanliness standards as defined by Mybookings.ae.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Pricing and Payments */}
          <PolicySection 
            title="Pricing and Payments" 
            icon={<DollarSign className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Rate Setting</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">You are free to set your own nightly rates, cleaning fees, and other charges.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Commission Fees</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Mybookings.ae may charge a commission fee per successful booking (to be outlined in the Host Dashboard).</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Payouts</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Payouts will be made to the Host via selected payment method after guest check-in and as per the payout schedule.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Additional Charges</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Mybookings.ae is not responsible for any currency conversion fees or bank charges incurred.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Bookings and Cancellations */}
          <PolicySection 
            title="Bookings and Cancellations" 
            icon={<Calendar className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Calendar Management</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Hosts are required to keep their calendar updated to avoid double bookings.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Reservation Honoring</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Hosts must honor all confirmed reservations unless there are exceptional circumstances.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Cancellation Penalties</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Cancellations initiated by the Host without valid reasons may result in penalties, including suspension of account or financial deductions.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Guest Cancellation Policy</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Guests are subject to the cancellation policy set by the Host at the time of booking.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Guest Communication */}
          <PolicySection 
            title="Guest Communication & Responsibilities" 
            icon={<MessageSquare className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Communication Standards</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Hosts must communicate promptly and respectfully with guests.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Property Standards</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Hosts are responsible for ensuring the property is clean, safe, and as described at check-in.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Issue Reporting</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Any disputes, damage, or complaints must be reported to Mybookings.ae within 24 hours of occurrence.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Compliance with Laws */}
          <PolicySection 
            title="Compliance with Laws" 
            icon={<Gavel className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Legal Compliance</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Hosts must comply with all applicable local laws, licensing, tax obligations, and regulations regarding property rental.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Required Permits</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">It is your responsibility to obtain any required holiday home permits, tourism licenses, or municipality approvals.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Liability Disclaimer</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Mybookings.ae is not liable for any legal actions arising from a Host's failure to comply with regulations.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Prohibited Activities */}
          <PolicySection 
            title="Prohibited Activities" 
            icon={<AlertTriangle className="h-6 w-6 text-orange-500"/>}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground dark:text-gray-400 mb-4">Hosts must not:</p>
              <div className="grid gap-3">
                {[
                  "List unauthorized or fictitious properties.",
                  "Provide misleading or fraudulent information.",
                  "Discriminate against guests based on race, gender, religion, or nationality.",
                  "Violate local housing, zoning, or safety laws.",
                  "Use the platform for illegal activities."
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-red-700 dark:text-red-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </PolicySection>

          {/* Limitation of Liability */}
          <PolicySection 
            title="Limitation of Liability" 
            icon={<Shield className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Platform Role</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Mybookings.ae acts solely as an intermediary and does not own or operate listed properties.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Liability Scope</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">We are not liable for loss, damages, or disputes arising between Hosts and Guests, except where required by law.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Termination */}
          <PolicySection 
            title="Termination" 
            icon={<Power className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Account Suspension</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Mybookings.ae may suspend or terminate a Host's account for breach of terms, guest complaints, fraud, or legal issues.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Voluntary Deactivation</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">Hosts may deactivate their listing at any time through their dashboard.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Amendments */}
          <PolicySection 
            title="Amendments" 
            icon={<Edit className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes implies acceptance of the revised terms.
            </p>
          </PolicySection>

          {/* Governing Law */}
          <PolicySection 
            title="Governing Law" 
            icon={<Scale className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <p className="text-muted-foreground dark:text-gray-400 leading-relaxed">
              These Terms are governed by the laws of the Local Government laws of That country. Any disputes shall be resolved under the jurisdiction of Local courts.
            </p>
          </PolicySection>

          {/* Guest Verification and Responsibility */}
          <PolicySection 
            title="Guest Verification and Responsibility for Illegal Activity" 
            icon={<Eye className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Identity Verification</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">The Host is solely responsible for verifying the identity and legal documents of all guests at the time of check-in, including valid passport, Emirates ID, or visa documentation as applicable.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <div className="h-2 w-2 rounded-full bg-primary dark:bg-blue-400 mt-2 flex-shrink-0"/>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Activity Monitoring</p>
                    <p className="text-sm text-muted-foreground dark:text-gray-300">The Host is also obligated to monitor the behavior and activities of the guests during their stay. If any illegal, suspicious, or unauthorized activity is observed on the premises, the Host must take immediate action to stop it and report the matter to the relevant local authorities or to Mybookings.ae.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                  <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-red-700 dark:text-red-300">Compliance Consequences</p>
                    <p className="text-sm text-red-600 dark:text-red-400">Failure to comply with this responsibility may result in penalties, suspension of the Host account, or legal consequences under Local law.</p>
                  </div>
                </div>
              </div>
            </div>
          </PolicySection>

          {/* Contact Section */}
          <PolicySection 
            title="Contact" 
            icon={<Mail className="h-6 w-6 text-primary dark:text-blue-400"/>}
          >
            <div className="space-y-4">
              <p className="text-muted-foreground dark:text-gray-400">For support or inquiries:</p>
              <div className="grid gap-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <Mail className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground dark:text-gray-300">Email: support@mybookings.ae</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <Globe className="w-5 h-5 text-primary" />
                  <span className="text-sm text-muted-foreground dark:text-gray-300">Website: mybookings.ae</span>
                </div>
              </div>
            </div>
          </PolicySection>
        </ScrollArea>
      </div>
    </div>
  )
} 