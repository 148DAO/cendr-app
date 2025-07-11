"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Package,
  MapPin,
  DollarSign,
  Shield,
  CheckCircle,
  Truck,
  Zap,
  ArrowRight,
  Mail,
  Twitter,
  Instagram,
  Facebook,
  Route,
} from "lucide-react"

export default function LandingPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Here you would typically send the email to your backend
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Package className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">DropNGo</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
                How It Works
              </a>
              <a href="#why-choose-us" className="text-gray-600 hover:text-gray-900 transition-colors">
                Benefits
              </a>
              <a href="#faq" className="text-gray-600 hover:text-gray-900 transition-colors">
                FAQ
              </a>
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent">
                Join Waitlist
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Become a Driver</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-100">
                🚀 Now in Beta - Join the Waitlist
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Earn While You Drive. <span className="text-blue-600">Deliver Packages</span> Along Your Route.
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Send or deliver packages, effortlessly. No warehouses, just neighbors helping neighbors. Turn your daily
                commute into extra income.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-4 h-auto"
                  onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
                >
                  Join the Waitlist
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 text-lg px-8 py-4 h-auto bg-transparent"
                >
                  Become a Driver
                  <Truck className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Free to join
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Verified drivers
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  Real-time tracking
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="w-80 h-96 bg-gray-900 rounded-3xl p-2 shadow-2xl">
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                    <img
                      src="/placeholder.svg?height=400&width=320"
                      alt="DropNGo App Interface"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Coming Soon
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to start earning or sending packages with DropNGo
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 border-2 hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Package className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">1. Post Your Package</h3>
              <p className="text-gray-600">
                Senders post package details with pickup and drop-off locations. Set your preferred delivery window and
                price.
              </p>
            </Card>
            <Card className="text-center p-8 border-2 hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Route className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">2. Drivers Accept</h3>
              <p className="text-gray-600">
                Drivers see nearby deliveries on their route and accept the ones that work for their schedule and
                location.
              </p>
            </Card>
            <Card className="text-center p-8 border-2 hover:border-blue-200 transition-colors">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4">3. Fast Delivery</h3>
              <p className="text-gray-600">
                Package gets delivered quickly and flexibly. Track in real-time and get notifications every step of the
                way.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-choose-us" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose DropNGo?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The smarter way to send packages and earn money on the road
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Save Money on Shipping</h3>
              <p className="text-gray-600">
                Skip expensive shipping fees. Get your packages delivered by neighbors at a fraction of the cost.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Let Your Drive Pay</h3>
              <p className="text-gray-600">
                Turn your daily commute into income. Pick up packages along your route and earn extra money.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Safe, Verified Users</h3>
              <p className="text-gray-600">
                All drivers are background-checked and verified. Your packages are in trusted hands.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold mb-3">Flexible & Fast</h3>
              <p className="text-gray-600">
                Same-day or scheduled delivery. Choose what works for your timeline and budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">Built on Trust & Safety</h2>
              <p className="text-xl text-gray-600 mb-8">
                Your security is our priority. Every driver is thoroughly vetted, and every delivery is protected.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Driver Verification</h3>
                    <p className="text-gray-600">
                      Background checks, license verification, and identity confirmation for all drivers.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Real-Time Tracking</h3>
                    <p className="text-gray-600">
                      Track your package every step of the way with live GPS updates and notifications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Shield className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Optional Insurance</h3>
                    <p className="text-gray-600">
                      Protect valuable packages with optional insurance coverage for complete peace of mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <img src="/placeholder.svg?height=400&width=400" alt="Trust and Security" className="w-full max-w-md" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about DropNGo</p>
          </div>
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">Who can become a driver?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Anyone 21+ with a valid driver's license, clean driving record, and reliable vehicle can apply. We
                conduct background checks and verify all documents before approval. You'll need a smartphone and basic
                insurance coverage.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">How do I get paid?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Drivers are paid instantly after each successful delivery through the app. You can cash out anytime to
                your bank account or debit card. We use secure payment processing with no hidden fees.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">
                What kinds of packages can I send?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Most everyday items under 50 lbs are accepted - documents, clothing, electronics, gifts, and more. We
                don't allow hazardous materials, perishables, or illegal items. Full guidelines are provided when you
                post a package.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">How much can I earn as a driver?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Earnings vary based on distance, package size, and demand. Most drivers earn $10-30 per delivery, with
                potential for $100-500+ per week depending on how often you drive and accept deliveries.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">Is my package insured?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Basic coverage is included for all packages up to $100. Optional additional insurance is available for
                higher-value items. All drivers are also required to maintain valid auto insurance.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6" className="bg-white rounded-lg px-6">
              <AccordionTrigger className="text-left font-semibold">When will the app be available?</AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We're currently in beta testing and plan to launch publicly in early 2024. Join our waitlist to be among
                the first to access the app and receive exclusive early-user benefits.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Email Signup Section */}
      <section id="waitlist" className="py-20 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of early users and be the first to experience DropNGo
          </p>
          <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-lg"
              />
              <Button
                type="submit"
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 h-12 px-8"
                disabled={isSubmitted}
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="mr-2 h-5 w-5" />
                    Joined!
                  </>
                ) : (
                  <>
                    <Mail className="mr-2 h-5 w-5" />
                    Join Waitlist
                  </>
                )}
              </Button>
            </div>
          </form>
          <p className="text-blue-100 text-sm mt-4">No spam, ever. Unsubscribe anytime.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center mb-4">
                <Package className="h-8 w-8 text-blue-400" />
                <span className="ml-2 text-2xl font-bold">DropNGo</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The peer-to-peer delivery platform that connects drivers with people who need packages delivered. Earn
                money while you drive, save money when you send.
              </p>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Instagram className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-2">
                  <Facebook className="h-5 w-5" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Safety
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 DropNGo. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
