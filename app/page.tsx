"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import {
  Package,
  MapPin,
  Clock,
  DollarSign,
  User,
  CreditCard,
  HelpCircle,
  Camera,
  Navigation,
  Star,
  Filter,
  CheckCircle,
  Truck,
  Home,
  Settings,
  Upload,
  History,
  Shield,
  Mail,
  Phone,
  AlertTriangle,
  X,
  Plus,
  Edit,
  Trash2,
  MessageCircle,
  Bell,
  Eye,
  Download,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type UserMode = "sender" | "driver"
type Screen =
  | "home"
  | "send-package"
  | "driver-home"
  | "delivery-detail"
  | "live-map"
  | "profile"
  | "payments"
  | "support"
  | "settings"
  | "history"
  | "earnings"
  | "edit-profile"
  | "add-payment"
  | "all-transactions"
  | "delivery-details"
  | "chat"
  | "notifications"

export default function DeliveryApp() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authScreen, setAuthScreen] = useState<"login" | "signup">("login")
  const [loginForm, setLoginForm] = useState({ email: "", password: "" })
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  })
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [userMode, setUserMode] = useState<UserMode>("sender")
  const [selectedDelivery, setSelectedDelivery] = useState<any>(null)
  const [showModal, setShowModal] = useState<string | null>(null)
  const [photoTaken, setPhotoTaken] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { sender: "driver", message: "Hi! I'm on my way to pick up your package.", time: "2:30 PM" },
    { sender: "user", message: "Great! I'll leave it on the front porch.", time: "2:32 PM" },
  ])
  const [newMessage, setNewMessage] = useState("")

  const Logo = ({ size = "normal" }: { size?: "normal" | "large" }) => (
    <div className="flex items-center">
      <Package className={`${size === "large" ? "h-10 w-10" : "h-8 w-8"} text-blue-600 mr-3`} />
      <span className={`${size === "large" ? "text-4xl" : "text-2xl"} font-bold text-blue-600`}>CenDr</span>
    </div>
  )

  const LoginScreen = () => (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 pt-16 pb-8 px-4 text-center">
        <Logo size="large" />
        <p className="text-gray-600 mt-4 text-lg">Welcome back to CenDr</p>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-4 pb-8">
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Sign In</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={loginForm.email}
                onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>
            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                if (loginForm.email && loginForm.password) {
                  setShowModal("logging-in")
                  setTimeout(() => {
                    setShowModal(null)
                    setIsAuthenticated(true)
                  }, 2000)
                }
              }}
              disabled={!loginForm.email || !loginForm.password}
            >
              Sign In
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Forgot Password?
            </Button>
          </CardContent>
        </Card>

        {/* Social Login */}
        <div className="max-w-sm mx-auto mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-white">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="bg-white">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => setAuthScreen("signup")}>
              Sign up
            </Button>
          </p>
        </div>
      </div>

      {/* Logging In Modal */}
      {showModal === "logging-in" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Signing you in...</h3>
            <p className="text-gray-600">Please wait a moment</p>
          </div>
        </div>
      )}
    </div>
  )

  const SignupScreen = () => (
    <div className="h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 pt-12 pb-6 px-4 text-center">
        <Logo size="large" />
        <p className="text-gray-600 mt-2">Join the CenDr community</p>
      </div>

      {/* Signup Form */}
      <div className="flex-1 overflow-y-auto px-4 pb-8">
        <Card className="max-w-sm mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Create Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={signupForm.firstName}
                  onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  value={signupForm.lastName}
                  onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="signupEmail">Email</Label>
              <Input
                id="signupEmail"
                type="email"
                placeholder="john@example.com"
                value={signupForm.email}
                onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={signupForm.phone}
                onChange={(e) => setSignupForm({ ...signupForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="signupPassword">Password</Label>
              <Input
                id="signupPassword"
                type="password"
                placeholder="Create a password"
                value={signupForm.password}
                onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={signupForm.confirmPassword}
                onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
              />
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1" />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  Terms of Service
                </Button>{" "}
                and{" "}
                <Button variant="link" className="p-0 h-auto text-blue-600 text-sm">
                  Privacy Policy
                </Button>
              </Label>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={() => {
                if (
                  signupForm.firstName &&
                  signupForm.lastName &&
                  signupForm.email &&
                  signupForm.phone &&
                  signupForm.password &&
                  signupForm.confirmPassword &&
                  signupForm.password === signupForm.confirmPassword
                ) {
                  setShowModal("signing-up")
                  setTimeout(() => {
                    setShowModal(null)
                    setIsAuthenticated(true)
                  }, 2000)
                }
              }}
              disabled={
                !signupForm.firstName ||
                !signupForm.lastName ||
                !signupForm.email ||
                !signupForm.phone ||
                !signupForm.password ||
                !signupForm.confirmPassword ||
                signupForm.password !== signupForm.confirmPassword
              }
            >
              Create Account
            </Button>
          </CardContent>
        </Card>

        {/* Social Signup */}
        <div className="max-w-sm mx-auto mt-6 space-y-3">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-50 px-2 text-gray-500">Or sign up with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="bg-white">
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="bg-white">
              <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>
        </div>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Button variant="link" className="p-0 h-auto text-blue-600" onClick={() => setAuthScreen("login")}>
              Sign in
            </Button>
          </p>
        </div>
      </div>

      {/* Signing Up Modal */}
      {showModal === "signing-up" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Creating your account...</h3>
            <p className="text-gray-600">Welcome to CenDr!</p>
          </div>
        </div>
      )}
    </div>
  )

  const SenderHomeScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <Logo />
            <p className="text-gray-600 ml-11">Send packages anywhere</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("notifications")} className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUserMode("driver")}
              className="text-blue-600 border-blue-600"
            >
              Switch to Driver
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Send Package Button */}
        <div className="p-4">
          <Button
            className="w-full h-16 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg"
            onClick={() => setCurrentScreen("send-package")}
          >
            <Package className="mr-3 h-6 w-6" />
            Send a Package
          </Button>
        </div>

        {/* Active Deliveries */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold mb-3">Active Deliveries</h2>
          <Card
            className="cursor-pointer"
            onClick={() => {
              setSelectedDelivery({ id: "DEL001", pickup: "123 Oak Street", status: "in-transit" })
              setCurrentScreen("delivery-details")
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium">To: 123 Oak Street</p>
                    <p className="text-sm text-gray-600">Expected: Today 3:00 PM</p>
                  </div>
                </div>
                <Badge variant="secondary">In Transit</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Deliveries */}
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold">Recent Deliveries</h2>
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("history")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            <Card
              className="cursor-pointer"
              onClick={() => {
                setSelectedDelivery({ id: "DEL002", pickup: "456 Pine Avenue", status: "completed" })
                setCurrentScreen("delivery-details")
              }}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="font-medium">To: 456 Pine Avenue</p>
                      <p className="text-sm text-gray-600">Delivered yesterday</p>
                    </div>
                  </div>
                  <p className="font-semibold">$12.50</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="flex justify-around py-2">
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("home")}>
              <Home className="h-5 w-5" />
              <span className="text-xs mt-1">Home</span>
            </Button>
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("profile")}>
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("payments")}>
              <CreditCard className="h-5 w-5" />
              <span className="text-xs mt-1">Payments</span>
            </Button>
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("support")}>
              <HelpCircle className="h-5 w-5" />
              <span className="text-xs mt-1">Support</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  const SendPackageScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("home")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Send Package</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Addresses */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5" />
              Pickup & Delivery
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="pickup">Pickup Address</Label>
              <Input id="pickup" placeholder="Enter pickup address" />
            </div>
            <div>
              <Label htmlFor="delivery">Delivery Address</Label>
              <Input id="delivery" placeholder="Enter delivery address" />
            </div>
          </CardContent>
        </Card>

        {/* Pickup Options */}
        <Card>
          <CardHeader>
            <CardTitle>Pickup Location</CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select pickup location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="porch">Front Porch</SelectItem>
                <SelectItem value="mailbox">Mailbox</SelectItem>
                <SelectItem value="inside">Inside Home</SelectItem>
                <SelectItem value="custom">Custom Location</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Package Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Package Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="What are you sending?" />
            </div>
            <Button
              variant="outline"
              className={`w-full ${photoTaken ? "bg-green-50 border-green-200" : "bg-transparent"}`}
              onClick={() => {
                setPhotoTaken(true)
                setShowModal("photo-taken")
                setTimeout(() => setShowModal(null), 2000)
              }}
            >
              <Camera className="mr-2 h-4 w-4" />
              {photoTaken ? "Photo Added ✓" : "Add Photo (Optional)"}
            </Button>
          </CardContent>
        </Card>

        {/* Delivery Window */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="mr-2 h-5 w-5" />
              Delivery Window
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select delivery time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="flexible">Flexible (2-3 days)</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="tomorrow">Tomorrow</SelectItem>
                <SelectItem value="exact">Choose Exact Time</SelectItem>
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Cost Estimate */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                <span className="font-semibold">Estimated Cost</span>
              </div>
              <span className="text-2xl font-bold text-green-600">$15.75</span>
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => {
            setShowModal("delivery-requested")
            setTimeout(() => {
              setShowModal(null)
              setCurrentScreen("home")
            }, 3000)
          }}
        >
          Request Delivery
        </Button>
      </div>

      {/* Photo Taken Modal */}
      {showModal === "photo-taken" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
              <p className="font-semibold">Photo captured successfully!</p>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Requested Modal */}
      {showModal === "delivery-requested" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Delivery Requested!</h3>
            <p className="text-gray-600">We're finding a driver for you...</p>
          </div>
        </div>
      )}
    </div>
  )

  const DriverHomeScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
            <p className="text-gray-600">Find deliveries on your route</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("notifications")} className="relative">
              <Bell className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setUserMode("sender")}
              className="text-blue-600 border-blue-600"
            >
              Switch to Sender
            </Button>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Map View */}
        <div className="h-64 bg-gray-300 relative flex-shrink-0">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="h-12 w-12 mx-auto text-gray-500 mb-2" />
              <p className="text-gray-600">Interactive map showing nearby packages</p>
            </div>
          </div>
          <Button className="absolute top-4 right-4" onClick={() => setCurrentScreen("live-map")}>
            <Navigation className="mr-2 h-4 w-4" />
            Live Map
          </Button>
        </div>

        {/* Filters */}
        <div className="p-4">
          <div className="flex items-center space-x-2 mb-4">
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="font-medium">Filters:</span>
            <Badge variant="secondary">On Route</Badge>
            <Badge variant="secondary">$10+ Payout</Badge>
            <Button variant="ghost" size="sm" onClick={() => setShowModal("filters")}>
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Available Deliveries */}
        <div className="px-4 pb-4">
          <h2 className="text-lg font-semibold mb-3">Available Deliveries</h2>
          <div className="space-y-3">
            {[
              {
                id: 1,
                pickup: "123 Main St",
                dropoff: "456 Oak Ave",
                distance: "2.3 mi",
                payout: "$18.50",
                time: "30 min",
              },
              {
                id: 2,
                pickup: "789 Pine Rd",
                dropoff: "321 Elm St",
                distance: "1.8 mi",
                payout: "$15.25",
                time: "25 min",
              },
              {
                id: 3,
                pickup: "555 Cedar Ln",
                dropoff: "777 Birch Dr",
                distance: "3.1 mi",
                payout: "$22.00",
                time: "40 min",
              },
            ].map((delivery) => (
              <Card
                key={delivery.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => {
                  setSelectedDelivery(delivery)
                  setCurrentScreen("delivery-detail")
                }}
              >
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="font-medium">{delivery.pickup}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="font-medium">{delivery.dropoff}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-green-600">{delivery.payout}</p>
                      <p className="text-sm text-gray-600">
                        {delivery.distance} • {delivery.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">Small Package</Badge>
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="ml-1 text-sm">4.8</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="flex justify-around py-2">
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("driver-home")}>
              <Truck className="h-5 w-5" />
              <span className="text-xs mt-1">Deliveries</span>
            </Button>
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("history")}>
              <History className="h-5 w-5" />
              <span className="text-xs mt-1">History</span>
            </Button>
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("profile")}>
              <User className="h-5 w-5" />
              <span className="text-xs mt-1">Profile</span>
            </Button>
            <Button variant="ghost" className="flex-col h-16" onClick={() => setCurrentScreen("earnings")}>
              <DollarSign className="h-5 w-5" />
              <span className="text-xs mt-1">Earnings</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Filters Modal */}
      {showModal === "filters" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Delivery Filters</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Minimum Payout</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="$10+" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">$5+</SelectItem>
                    <SelectItem value="10">$10+</SelectItem>
                    <SelectItem value="15">$15+</SelectItem>
                    <SelectItem value="20">$20+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Maximum Distance</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="5 miles" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 mile</SelectItem>
                    <SelectItem value="3">3 miles</SelectItem>
                    <SelectItem value="5">5 miles</SelectItem>
                    <SelectItem value="10">10 miles</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <span>On My Route Only</span>
                <Switch />
              </div>
              <Button className="w-full" onClick={() => setShowModal(null)}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  const DeliveryDetailScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("driver-home")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Delivery Details</h1>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Map Preview */}
        <Card>
          <CardContent className="p-0">
            <div className="h-48 bg-gray-300 rounded-t-lg relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 mx-auto text-gray-500 mb-2" />
                  <p className="text-gray-600">Route Preview</p>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Pickup: {selectedDelivery?.pickup}</p>
                    <p className="text-sm text-gray-600">Front porch, ring doorbell</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <div>
                    <p className="font-medium">Drop-off: {selectedDelivery?.dropoff}</p>
                    <p className="text-sm text-gray-600">Leave at door, no signature required</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2 h-5 w-5" />
              Package Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">Small Package</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Description:</span>
              <span className="font-medium">Electronics (fragile)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Special Notes:</span>
              <span className="font-medium">Handle with care</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Sender Rating:</span>
              <div className="flex items-center">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">4.9 (127 reviews)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Info */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <DollarSign className="mr-2 h-5 w-5 text-green-600" />
                <span className="font-semibold">Payment Offer</span>
              </div>
              <span className="text-3xl font-bold text-green-600">{selectedDelivery?.payout}</span>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Base Rate:</span>
                <span>$12.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Distance Bonus:</span>
                <span>$4.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Priority Bonus:</span>
                <span>$2.00</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          className="w-full h-12 text-lg font-semibold bg-green-600 hover:bg-green-700"
          onClick={() => {
            setShowModal("delivery-accepted")
            setTimeout(() => {
              setShowModal(null)
              setCurrentScreen("live-map")
            }, 2000)
          }}
        >
          Accept Delivery
        </Button>
      </div>

      {/* Delivery Accepted Modal */}
      {showModal === "delivery-accepted" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Delivery Accepted!</h3>
            <p className="text-gray-600">Starting navigation...</p>
          </div>
        </div>
      )}
    </div>
  )

  const LiveMapScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("driver-home")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold">Live Navigation</h1>
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("settings")}>
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Full Screen Map */}
      <div className="h-[calc(100vh-140px)] bg-gray-300 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="h-16 w-16 mx-auto text-gray-500 mb-4" />
            <p className="text-xl font-semibold text-gray-700">Live Navigation</p>
            <p className="text-gray-600">Real-time GPS tracking</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="absolute top-4 left-4 right-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">En Route to Pickup</p>
                <p className="text-sm text-gray-600">123 Main Street</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold">8 min</p>
                <p className="text-sm text-gray-600">1.2 miles</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="absolute bottom-4 left-4 right-4 space-y-2">
          <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => setShowModal("calling")}>
            <Phone className="mr-2 h-4 w-4" />
            Call Customer
          </Button>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentScreen("chat")}>
            <MessageCircle className="mr-2 h-4 w-4" />
            Message Customer
          </Button>
          <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowModal("report-issue")}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Report Issue
          </Button>
        </div>
      </div>

      {/* Calling Modal */}
      {showModal === "calling" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <Phone className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Calling Customer...</h3>
            <p className="text-gray-600 mb-4">(555) 123-4567</p>
            <Button variant="outline" onClick={() => setShowModal(null)}>
              End Call
            </Button>
          </div>
        </div>
      )}

      {/* Report Issue Modal */}
      {showModal === "report-issue" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-80">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Report Issue</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowModal(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-4">
              <div>
                <Label>Issue Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select issue type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="address">Wrong Address</SelectItem>
                    <SelectItem value="access">Can't Access Location</SelectItem>
                    <SelectItem value="customer">Customer Not Available</SelectItem>
                    <SelectItem value="package">Package Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea placeholder="Describe the issue..." />
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  setShowModal("issue-reported")
                  setTimeout(() => setShowModal(null), 2000)
                }}
              >
                Submit Report
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Issue Reported Modal */}
      {showModal === "issue-reported" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="font-semibold">Issue reported successfully!</p>
          </div>
        </div>
      )}
    </div>
  )

  const ChatScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white px-4 py-4 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("live-map")}>
            ← Back
          </Button>
          <div className="ml-4">
            <h1 className="text-lg font-semibold">Chat with {userMode === "driver" ? "Customer" : "Driver"}</h1>
            <p className="text-sm text-gray-600">John Doe</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-600 text-white" : "bg-white border"
              }`}
            >
              <p>{msg.message}</p>
              <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}>{msg.time}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t p-4 flex-shrink-0">
        <div className="flex space-x-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyPress={(e) => {
              if (e.key === "Enter" && newMessage.trim()) {
                setChatMessages([
                  ...chatMessages,
                  {
                    sender: "user",
                    message: newMessage,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  },
                ])
                setNewMessage("")
              }
            }}
          />
          <Button
            onClick={() => {
              if (newMessage.trim()) {
                setChatMessages([
                  ...chatMessages,
                  {
                    sender: "user",
                    message: newMessage,
                    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                  },
                ])
                setNewMessage("")
              }
            }}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  )

  const NotificationsScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen(userMode === "sender" ? "home" : "driver-home")}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Notifications</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {[
          {
            type: "delivery",
            title: "Package Delivered",
            message: "Your package to 123 Oak Street has been delivered successfully.",
            time: "2 hours ago",
            unread: true,
          },
          {
            type: "payment",
            title: "Payment Processed",
            message: "Payment of $15.75 has been charged to your card ending in 4242.",
            time: "5 hours ago",
            unread: true,
          },
          {
            type: "driver",
            title: "Driver Assigned",
            message: "John D. has accepted your delivery request and is on the way.",
            time: "1 day ago",
            unread: false,
          },
          {
            type: "promo",
            title: "Special Offer",
            message: "Get 20% off your next delivery with code SAVE20",
            time: "2 days ago",
            unread: false,
          },
        ].map((notification, index) => (
          <Card key={index} className={notification.unread ? "border-blue-200 bg-blue-50" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-3">
                <div
                  className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-blue-600" : "bg-transparent"}`}
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold">{notification.title}</h3>
                    <span className="text-xs text-gray-500">{notification.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm">{notification.message}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const EditProfileScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("profile")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Edit Profile</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Photo */}
        <Card>
          <CardContent className="p-6 text-center">
            <Avatar className="h-24 w-24 mx-auto mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="bg-transparent">
              <Camera className="mr-2 h-4 w-4" />
              Change Photo
            </Button>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" defaultValue="John" />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" defaultValue="Doe" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue="john.doe@email.com" />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue="(555) 123-4567" />
            </div>
          </CardContent>
        </Card>

        {userMode === "driver" && (
          <Card>
            <CardHeader>
              <CardTitle>Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="make">Make & Model</Label>
                <Input id="make" defaultValue="Toyota Camry" />
              </div>
              <div>
                <Label htmlFor="year">Year</Label>
                <Input id="year" defaultValue="2020" />
              </div>
              <div>
                <Label htmlFor="license">License Plate</Label>
                <Input id="license" defaultValue="ABC123" />
              </div>
            </CardContent>
          </Card>
        )}

        <Button
          className="w-full"
          onClick={() => {
            setShowModal("profile-updated")
            setTimeout(() => {
              setShowModal(null)
              setCurrentScreen("profile")
            }, 2000)
          }}
        >
          Save Changes
        </Button>
      </div>

      {/* Profile Updated Modal */}
      {showModal === "profile-updated" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="font-semibold">Profile updated successfully!</p>
          </div>
        </div>
      )}
    </div>
  )

  const AddPaymentScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("payments")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Add Payment Method</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Card Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiry">Expiry Date</Label>
                <Input id="expiry" placeholder="MM/YY" />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" placeholder="123" />
              </div>
            </div>
            <div>
              <Label htmlFor="name">Cardholder Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="address">Street Address</Label>
              <Input id="address" placeholder="123 Main Street" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="New York" />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="NY" />
              </div>
            </div>
            <div>
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" placeholder="10001" />
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="default" className="rounded" />
          <Label htmlFor="default">Set as default payment method</Label>
        </div>

        <Button
          className="w-full"
          onClick={() => {
            setShowModal("payment-added")
            setTimeout(() => {
              setShowModal(null)
              setCurrentScreen("payments")
            }, 2000)
          }}
        >
          Add Payment Method
        </Button>
      </div>

      {/* Payment Added Modal */}
      {showModal === "payment-added" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-2" />
            <p className="font-semibold">Payment method added successfully!</p>
          </div>
        </div>
      )}
    </div>
  )

  const AllTransactionsScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("payments")}>
              ← Back
            </Button>
            <h1 className="text-xl font-semibold ml-4">All Transactions</h1>
          </div>
          <Button variant="outline" size="sm" className="bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Filter Options */}
        <div className="flex space-x-2">
          <Button variant="default" size="sm" className="bg-blue-600">
            All
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Income
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Expenses
          </Button>
        </div>

        {/* Transactions */}
        <div className="space-y-3">
          {Array.from({ length: 20 }, (_, i) => ({
            id: `TXN${String(i + 1).padStart(3, "0")}`,
            type: Math.random() > 0.5 ? "earned" : "paid",
            amount: `$${(Math.random() * 30 + 10).toFixed(2)}`,
            desc: "Package delivery",
            date: `Dec ${Math.floor(Math.random() * 7) + 1}`,
            time: `${Math.floor(Math.random() * 12) + 1}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")} PM`,
          })).map((transaction) => (
            <Card key={transaction.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === "earned" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      <DollarSign
                        className={`h-4 w-4 ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">{transaction.desc}</p>
                      <p className="text-sm text-gray-600">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`font-semibold ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}
                    >
                      {transaction.type === "earned" ? "+" : ""}
                      {transaction.amount}
                    </span>
                    <p className="text-xs text-gray-500">#{transaction.id}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )

  const DeliveryDetailsScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("history")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Delivery Details</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="default" className="bg-green-100 text-green-800">
                {selectedDelivery?.status === "completed" ? "Completed" : "In Transit"}
              </Badge>
              <span className="text-sm text-gray-600">#{selectedDelivery?.id}</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Pickup: {selectedDelivery?.pickup}</p>
                  <p className="text-sm text-gray-600">Dec 7, 2024 at 2:30 PM</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                <div>
                  <p className="font-medium">Drop-off: 456 Oak Avenue</p>
                  <p className="text-sm text-gray-600">Dec 7, 2024 at 3:15 PM</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Driver/Customer Info */}
        <Card>
          <CardHeader>
            <CardTitle>{userMode === "driver" ? "Customer" : "Driver"} Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=40&width=40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">John Doe</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">4.9 (127 reviews)</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Phone className="mr-2 h-4 w-4" />
                Call
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Package Details */}
        <Card>
          <CardHeader>
            <CardTitle>Package Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">Small Package</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Description:</span>
              <span className="font-medium">Electronics (fragile)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium">2.5 lbs</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Special Instructions:</span>
              <span className="font-medium">Handle with care</span>
            </div>
          </CardContent>
        </Card>

        {/* Payment Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Base Rate:</span>
              <span>$12.00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Distance Fee:</span>
              <span>$3.75</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee:</span>
              <span>$2.00</span>
            </div>
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span className={userMode === "driver" ? "text-green-600" : "text-red-600"}>
                {userMode === "driver" ? "+$15.75" : "$17.75"}
              </span>
            </div>
          </CardContent>
        </Card>

        {selectedDelivery?.status === "completed" && (
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1 bg-transparent">
              <AlertTriangle className="mr-2 h-4 w-4" />
              Report Issue
            </Button>
            <Button variant="outline" className="flex-1 bg-transparent">
              <Download className="mr-2 h-4 w-4" />
              Receipt
            </Button>
          </div>
        )}
      </div>
    </div>
  )

  // Update the existing screens with proper navigation
  const ProfileScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen(userMode === "sender" ? "home" : "driver-home")}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Profile</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Profile Info */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src="/placeholder.svg?height=64&width=64" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">John Doe</h2>
                <p className="text-gray-600">john.doe@email.com</p>
                <div className="flex items-center mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 font-medium">4.8</span>
                  <span className="ml-1 text-gray-600">(156 reviews)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {userMode === "driver" && (
          <>
            {/* Verification Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Verification Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Driver's License</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Background Check</span>
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Verified
                  </Badge>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  <Upload className="mr-2 h-4 w-4" />
                  Update Documents
                </Button>
              </CardContent>
            </Card>

            {/* Earnings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="mr-2 h-5 w-5" />
                  Earnings Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">$1,247</p>
                    <p className="text-sm text-gray-600">This Month</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">89</p>
                    <p className="text-sm text-gray-600">Deliveries</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentScreen("history")}>
                  <History className="mr-2 h-4 w-4" />
                  View Full History
                </Button>
              </CardContent>
            </Card>
          </>
        )}

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span>Push Notifications</span>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span>Email Updates</span>
              <Switch defaultChecked />
            </div>
            <Separator />
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setCurrentScreen("edit-profile")}
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setCurrentScreen("payments")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setCurrentScreen("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              App Settings
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setCurrentScreen("support")}
            >
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-red-600 bg-transparent">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove your data from
                    our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const PaymentsScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen(userMode === "sender" ? "home" : "driver-home")}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Payments</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="mr-2 h-5 w-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 4242</p>
                  <p className="text-sm text-gray-600">Expires 12/26</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="bg-green-100 text-green-800">
                  Default
                </Badge>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-6 bg-red-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">MC</span>
                </div>
                <div>
                  <p className="font-medium">•••• •••• •••• 8888</p>
                  <p className="text-sm text-gray-600">Expires 08/27</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Remove Payment Method</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove this payment method?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction>Remove</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setCurrentScreen("add-payment")}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Payment Method
            </Button>
          </CardContent>
        </Card>

        {userMode === "driver" && (
          <Card>
            <CardHeader>
              <CardTitle>Payout Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium">Bank Account</p>
                    <p className="text-sm text-gray-600">Chase ••••5678</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-green-100 text-green-800">
                    Active
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Auto-payout</span>
                <Switch defaultChecked />
              </div>
              <p className="text-sm text-gray-600">Automatically transfer earnings to your bank account daily</p>
            </CardContent>
          </Card>
        )}

        {/* Transaction History */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("all-transactions")}>
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                type: userMode === "driver" ? "earned" : "paid",
                amount: userMode === "driver" ? "+$18.50" : "-$15.75",
                desc: "Package delivery",
                date: "Today",
              },
              {
                type: userMode === "driver" ? "earned" : "paid",
                amount: userMode === "driver" ? "+$22.00" : "-$12.50",
                desc: "Package delivery",
                date: "Yesterday",
              },
              {
                type: userMode === "driver" ? "earned" : "paid",
                amount: userMode === "driver" ? "+$15.25" : "-$18.00",
                desc: "Package delivery",
                date: "Dec 5",
              },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-3 border-b last:border-b-0">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      transaction.type === "earned" ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <DollarSign
                      className={`h-4 w-4 ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}
                    />
                  </div>
                  <div>
                    <p className="font-medium">{transaction.desc}</p>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <span className={`font-semibold ${transaction.type === "earned" ? "text-green-600" : "text-red-600"}`}>
                  {transaction.amount}
                </span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const SupportScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen(userMode === "sender" ? "home" : "driver-home")}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Help & Support</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>How can we help?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
              <HelpCircle className="mr-3 h-5 w-5" />
              Frequently Asked Questions
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12 bg-transparent"
              onClick={() => {
                setShowModal("live-chat")
                setTimeout(() => setShowModal(null), 3000)
              }}
            >
              <MessageCircle className="mr-3 h-5 w-5" />
              Start Live Chat
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
              <Mail className="mr-3 h-5 w-5" />
              Email Support
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
              <Package className="mr-3 h-5 w-5" />
              Report a Problem with Delivery
            </Button>
            <Button variant="outline" className="w-full justify-start h-12 bg-transparent">
              <Shield className="mr-3 h-5 w-5" />
              Safety & Security
            </Button>
          </CardContent>
        </Card>

        {/* Common Issues */}
        <Card>
          <CardHeader>
            <CardTitle>Common Issues</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">My package wasn't delivered</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  If your package wasn't delivered, first check the tracking information in the app. If the status shows
                  delivered but you haven't received it, contact the driver directly or reach out to our support team
                  for assistance.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">How do I cancel a delivery?</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  You can cancel a delivery request before a driver accepts it by going to your active deliveries and
                  selecting "Cancel". If a driver has already accepted, you'll need to contact them directly or our
                  support team.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">Payment issues</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  For payment problems, check your payment methods in the Payments section. If your card was declined,
                  try updating your payment information or using a different payment method.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-sm text-gray-600">support@cendr.com</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-sm text-gray-600">1-800-CENDR-01</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="font-medium">Live Chat</p>
                <p className="text-sm text-gray-600">Available 24/7</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Chat Modal */}
      {showModal === "live-chat" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <MessageCircle className="h-16 w-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Connecting to Support...</h3>
            <p className="text-gray-600">Please wait while we connect you to an agent.</p>
          </div>
        </div>
      )}
    </div>
  )

  const SettingsScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen(userMode === "sender" ? "home" : "driver-home")}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Settings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-600">Receive notifications on your device</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Updates</p>
                <p className="text-sm text-gray-600">Get updates via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-600">Text message alerts</p>
              </div>
              <Switch />
            </div>
            {userMode === "driver" && (
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">New Delivery Alerts</p>
                  <p className="text-sm text-gray-600">Get notified of nearby deliveries</p>
                </div>
                <Switch defaultChecked />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Location Services</p>
                <p className="text-sm text-gray-600">Allow location tracking for deliveries</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Share Analytics</p>
                <p className="text-sm text-gray-600">Help improve the app</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Privacy Policy
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent">
              <Shield className="mr-2 h-4 w-4" />
              Terms of Service
            </Button>
          </CardContent>
        </Card>

        {/* App Preferences */}
        <Card>
          <CardHeader>
            <CardTitle>App Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="language">Language</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="English" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="units">Distance Units</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Miles" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="miles">Miles</SelectItem>
                  <SelectItem value="km">Kilometers</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Account */}
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setCurrentScreen("edit-profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => setCurrentScreen("payments")}
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Payment Methods
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start bg-transparent"
              onClick={() => {
                setIsAuthenticated(false)
                setCurrentScreen("home")
                setAuthScreen("login")
              }}
            >
              Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )

  const HistoryScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentScreen(userMode === "sender" ? "home" : "driver-home")}
          >
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">{userMode === "driver" ? "Delivery History" : "Order History"}</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Filter Tabs */}
        <div className="flex space-x-2">
          <Button variant="default" size="sm" className="bg-blue-600">
            All
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Completed
          </Button>
          <Button variant="outline" size="sm" className="bg-transparent">
            Cancelled
          </Button>
        </div>

        {/* History Items */}
        <div className="space-y-3">
          {[
            {
              id: "DEL001",
              status: "completed",
              pickup: "123 Main St",
              dropoff: "456 Oak Ave",
              date: "Dec 7, 2024",
              amount: userMode === "driver" ? "$18.50" : "$15.75",
              rating: 5,
            },
            {
              id: "DEL002",
              status: "completed",
              pickup: "789 Pine Rd",
              dropoff: "321 Elm St",
              date: "Dec 6, 2024",
              amount: userMode === "driver" ? "$22.00" : "$18.00",
              rating: 4,
            },
            {
              id: "DEL003",
              status: "completed",
              pickup: "555 Cedar Ln",
              dropoff: "777 Birch Dr",
              date: "Dec 5, 2024",
              amount: userMode === "driver" ? "$15.25" : "$12.50",
              rating: 5,
            },
            {
              id: "DEL004",
              status: "cancelled",
              pickup: "999 Maple Ave",
              dropoff: "111 Spruce St",
              date: "Dec 4, 2024",
              amount: "$0.00",
              rating: null,
            },
          ].map((item) => (
            <Card
              key={item.id}
              className="cursor-pointer"
              onClick={() => {
                setSelectedDelivery(item)
                setCurrentScreen("delivery-details")
              }}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <Badge
                        variant={item.status === "completed" ? "default" : "secondary"}
                        className={item.status === "completed" ? "bg-green-100 text-green-800" : ""}
                      >
                        {item.status === "completed" ? "Completed" : "Cancelled"}
                      </Badge>
                      <span className="ml-2 text-sm text-gray-600">#{item.id}</span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">{item.pickup}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm font-medium">{item.dropoff}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-bold ${
                        item.status === "completed"
                          ? userMode === "driver"
                            ? "text-green-600"
                            : "text-red-600"
                          : "text-gray-400"
                      }`}
                    >
                      {userMode === "driver" && item.status === "completed" ? "+" : ""}
                      {item.amount}
                    </p>
                    <p className="text-sm text-gray-600">{item.date}</p>
                  </div>
                </div>
                {item.rating && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < item.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {userMode === "driver" ? "Customer rating" : "Driver rating"}
                      </span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Eye className="mr-1 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Button variant="outline" className="w-full bg-transparent">
          Load More
        </Button>
      </div>
    </div>
  )

  const EarningsScreen = () => (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-white px-4 py-6 shadow-sm flex-shrink-0">
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={() => setCurrentScreen("driver-home")}>
            ← Back
          </Button>
          <h1 className="text-xl font-semibold ml-4">Earnings</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Earnings Summary */}
        <Card>
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-green-600">$1,247.50</p>
              <p className="text-gray-600">Total Earnings This Month</p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">89</p>
                <p className="text-sm text-gray-600">Deliveries</p>
              </div>
              <div>
                <p className="text-xl font-bold">$14.02</p>
                <p className="text-sm text-gray-600">Avg per delivery</p>
              </div>
              <div>
                <p className="text-xl font-bold">4.8</p>
                <p className="text-sm text-gray-600">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Time Period Selector */}
        <Card>
          <CardContent className="p-4">
            <div className="flex space-x-2">
              <Button variant="default" size="sm" className="bg-blue-600">
                This Month
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                Last Month
              </Button>
              <Button variant="outline" size="sm" className="bg-transparent">
                This Year
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weekly Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { week: "Dec 2-8", deliveries: 23, earnings: "$312.50" },
              { week: "Nov 25-Dec 1", deliveries: 19, earnings: "$267.25" },
              { week: "Nov 18-24", deliveries: 21, earnings: "$289.75" },
              { week: "Nov 11-17", deliveries: 26, earnings: "$378.00" },
            ].map((week, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{week.week}</p>
                  <p className="text-sm text-gray-600">{week.deliveries} deliveries</p>
                </div>
                <p className="text-lg font-bold text-green-600">{week.earnings}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payout Info */}
        <Card>
          <CardHeader>
            <CardTitle>Next Payout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Available Balance</span>
              <span className="text-2xl font-bold text-green-600">$156.75</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Your next automatic payout is scheduled for tomorrow at 9:00 AM
            </p>
            <Button
              className="w-full bg-green-600 hover:bg-green-700"
              onClick={() => {
                setShowModal("cash-out")
                setTimeout(() => setShowModal(null), 3000)
              }}
            >
              Cash Out Now
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Cash Out Modal */}
      {showModal === "cash-out" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <DollarSign className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Cash Out Successful!</h3>
            <p className="text-gray-600">$156.75 has been transferred to your account.</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderScreen = () => {
    // Show auth screens if not authenticated
    if (!isAuthenticated) {
      return authScreen === "login" ? <LoginScreen /> : <SignupScreen />
    }

    // Show main app screens if authenticated
    switch (currentScreen) {
      case "home":
        return userMode === "sender" ? <SenderHomeScreen /> : <DriverHomeScreen />
      case "send-package":
        return <SendPackageScreen />
      case "driver-home":
        return <DriverHomeScreen />
      case "delivery-detail":
        return <DeliveryDetailScreen />
      case "live-map":
        return <LiveMapScreen />
      case "profile":
        return <ProfileScreen />
      case "payments":
        return <PaymentsScreen />
      case "support":
        return <SupportScreen />
      case "settings":
        return <SettingsScreen />
      case "history":
        return <HistoryScreen />
      case "earnings":
        return <EarningsScreen />
      case "edit-profile":
        return <EditProfileScreen />
      case "add-payment":
        return <AddPaymentScreen />
      case "all-transactions":
        return <AllTransactionsScreen />
      case "delivery-details":
        return <DeliveryDetailsScreen />
      case "chat":
        return <ChatScreen />
      case "notifications":
        return <NotificationsScreen />
      default:
        return <SenderHomeScreen />
    }
  }

  return <div className="max-w-sm mx-auto bg-white min-h-screen">{renderScreen()}</div>
}
