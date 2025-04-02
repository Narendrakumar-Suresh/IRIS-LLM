import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  FileText,
  Search,
  Sparkles,
  BookMarked,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Quote,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookMarked className="h-6 w-6 text-black" />
            <span className="text-xl font-bold">IRIS-LLM</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-gray-800 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-gray-800 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#use-cases"
              className="text-sm font-medium hover:text-gray-800 transition-colors"
            >
              Use Cases
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hidden sm:inline-flex text-sm font-medium text-gray-700 hover:text-gray-800 transition-colors"
            >
              Log in
            </Link>
            <Button className="bg-black hover:bg-gray-800">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
                  Inspired by Stanford's STORM
                </div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  AI-Powered Research Assistant with Comprehensive Citations
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  IRIS-LLM gathers, synthesizes, and generates comprehensive
                  research reports with proper citations from multiple sources,
                  saving you hours of manual research.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-black hover:bg-gray-800">
                    Try IRIS-LLM Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Watch Demo</Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>No credit card required</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Cancel anytime</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-gradient-to-b from-purple-50 to-white p-4 shadow-lg">
                  <div className="absolute inset-0 bg-grid-gray-100 [mask-image:linear-gradient(to_bottom,white,transparent)]" />
                  <div className="relative rounded-lg border bg-white p-4 shadow-sm">
                    <div className="mb-4 flex items-center gap-2">
                      <Search className="h-4 w-4 text-gray-500" />
                      <div className="text-sm font-medium">
                        Research Query: Impact of climate change on agriculture
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="mb-1 text-xs font-medium text-gray-500">
                          IRIS-LLM is gathering information...
                        </div>
                        <div className="flex items-start gap-2">
                          <FileText className="mt-1 h-4 w-4 text-black" />
                          <div className="text-sm">
                            Analyzing 24 peer-reviewed sources on climate change
                            effects on crop yields, soil quality, and
                            agricultural adaptation strategies.
                          </div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-purple-50 p-3">
                        <div className="mb-1 text-xs font-medium text-black">
                          Report Section: Key Findings
                        </div>
                        <div className="text-sm">
                          Climate change is projected to reduce global crop
                          yields by 2-6% per decade as temperatures rise
                          <sup>[1]</sup>. Adaptation strategies including
                          drought-resistant crops have shown promise in
                          mitigating these effects<sup>[2]</sup>.
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-50 p-3">
                        <div className="mb-1 text-xs font-medium text-gray-500">
                          Citations
                        </div>
                        <div className="text-xs text-gray-600">
                          [1] Porter, J.R. et al. (2023). "Climate Change
                          Effects on Global Agriculture"
                          <br />
                          [2] Zhang, M. & Williams, K. (2022). "Adaptation
                          Strategies for Agricultural Resilience"
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="bg-gray-50 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Research Smarter, Not Harder
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  IRIS-LLM transforms how you conduct research with powerful
                  AI-driven capabilities.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Search className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">Multi-Source Research</h3>
                <p className="text-center text-gray-500">
                  Automatically searches and analyzes information from academic
                  journals, books, and trusted online sources.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Sparkles className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">AI Synthesis</h3>
                <p className="text-center text-gray-500">
                  Intelligently combines information to create coherent,
                  comprehensive reports tailored to your research needs.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <Quote className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">Proper Citations</h3>
                <p className="text-center text-gray-500">
                  Automatically generates accurate citations in multiple formats
                  (APA, MLA, Chicago) for all sources used.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <BookOpen className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">Comprehensive Reports</h3>
                <p className="text-center text-gray-500">
                  Creates structured reports with executive summaries, key
                  findings, methodology, and detailed analysis.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <FileText className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">Export Options</h3>
                <p className="text-center text-gray-500">
                  Export your research in multiple formats including PDF, Word,
                  and markdown for seamless integration.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border bg-white p-6 shadow-sm">
                <div className="rounded-full bg-gray-100 p-3">
                  <ExternalLink className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-bold">Source Verification</h3>
                <p className="text-center text-gray-500">
                  Provides links to original sources and evaluates the
                  credibility of each reference used.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple Process, Powerful Results
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  IRIS-LLM streamlines your research workflow in just a few
                  simple steps.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  1
                </div>
                <h3 className="text-xl font-bold">Enter Your Query</h3>
                <p className="text-center text-gray-500">
                  Describe your research topic or question in natural language,
                  just as you would ask a human researcher.
                </p>
                <div className="mt-4 w-full rounded-lg border bg-gray-50 p-3">
                  <div className="text-sm text-gray-700">
                    "Analyze the impact of remote work on employee productivity
                    and mental health since 2020"
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  2
                </div>
                <h3 className="text-xl font-bold">IRIS-LLM Researches</h3>
                <p className="text-center text-gray-500">
                  The AI searches through multiple databases, academic journals,
                  and trusted sources to gather relevant information.
                </p>
                <div className="mt-4 w-full rounded-lg border bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div className="text-xs text-gray-500">
                      Analyzing 37 sources...
                    </div>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div className="h-full w-3/4 bg-black"></div>
                  </div>
                </div>
              </div>
              <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div className="absolute -top-3 -left-3 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  3
                </div>
                <h3 className="text-xl font-bold">Receive Your Report</h3>
                <p className="text-center text-gray-500">
                  Get a comprehensive, well-structured report with proper
                  citations that you can use immediately or customize further.
                </p>
                <div className="mt-4 w-full rounded-lg border bg-gray-50 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-black" />
                    <div className="text-sm font-medium">
                      Remote Work Impact Report
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Executive Summary, Key Findings, Methodology, Analysis, 42
                    Citations
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="bg-gray-50 py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
                  Use Cases
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Who Benefits from IRIS-LLM?
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  IRIS-LLM serves diverse research needs across multiple fields
                  and professions.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Academic Researchers</h3>
                <p className="text-gray-500">
                  Accelerate literature reviews, find relevant studies, and
                  generate properly cited background sections for papers.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Students</h3>
                <p className="text-gray-500">
                  Complete research assignments with comprehensive sources and
                  proper citations while learning about the topic.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Journalists</h3>
                <p className="text-gray-500">
                  Quickly gather background information and verified facts on
                  complex topics for articles and investigative reporting.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Business Analysts</h3>
                <p className="text-gray-500">
                  Research market trends, competitive landscapes, and industry
                  developments for strategic decision-making.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Legal Professionals</h3>
                <p className="text-gray-500">
                  Compile case precedents, legal frameworks, and relevant
                  statutes for case preparation and legal briefs.
                </p>
              </div>
              <div className="flex flex-col space-y-3 rounded-lg border bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold">Healthcare Providers</h3>
                <p className="text-gray-500">
                  Stay updated on the latest medical research, treatment
                  protocols, and clinical guidelines in specific areas.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="testimonials" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  What Researchers Are Saying
                </h2>
                <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from professionals who have transformed their research
                  process with IRIS-LLM.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-gray-500">
                    "IRIS-LLM cut my literature review time by 70%. The
                    citations were impeccable, and the synthesis of information
                    was better than what I could have done manually in weeks."
                  </blockquote>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Dr. Sarah Chen</p>
                    <p className="text-xs text-gray-500">
                      Professor of Economics, Stanford University
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-gray-500">
                    "As a journalist covering complex scientific topics,
                    IRIS-LLM has been invaluable. It helps me quickly understand
                    the research landscape and ensures I'm not missing critical
                    studies."
                  </blockquote>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">James Wilson</p>
                    <p className="text-xs text-gray-500">
                      Science Journalist, The Atlantic
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between space-y-4 rounded-lg border bg-white p-6 shadow-sm">
                <div>
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-yellow-500"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <blockquote className="mt-4 text-gray-500">
                    "My dissertation research would have taken months longer
                    without IRIS-LLM. It found connections between studies I
                    might have missed and saved me countless hours of manual
                    searching."
                  </blockquote>
                </div>
                <div className="flex items-center gap-4">
                  <Image
                    src="/placeholder.svg?height=40&width=40"
                    width={40}
                    height={40}
                    alt="User"
                    className="rounded-full"
                  />
                  <div>
                    <p className="text-sm font-medium">Miguel Rodriguez</p>
                    <p className="text-xs text-gray-500">PhD Candidate, MIT</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-black">
                  Get Started Today
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Transform Your Research Process with IRIS-LLM
                </h2>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Join thousands of researchers, students, and professionals who
                  are saving time and producing better research with IRIS-LLM.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-black hover:bg-gray-800">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline">Schedule Demo</Button>
                </div>
                <p className="text-sm text-gray-500">
                  No credit card required. 14-day free trial.
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="IRIS-LLM in action"
                  className="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t bg-white">
        <div className="container flex flex-col gap-6 py-12 px-4 md:px-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-3 lg:max-w-sm">
            <div className="flex items-center gap-2">
              <BookMarked className="h-6 w-6 text-black" />
              <span className="text-xl font-bold">IRIS-LLM</span>
            </div>
            <p className="text-sm text-gray-500">
              AI-powered research assistant that generates comprehensive reports
              with citations by gathering and synthesizing information from
              multiple sources.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-gray-500 hover:text-gray-800">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M12 2H2v10h10V2zM12 12H2v10h10V12zM22 2h-10v10h10V2zM22 12h-10v10h10V12z" />
                </svg>
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Product</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Use Cases
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Resources</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Guides
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Company</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-medium">Legal</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Security
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-500 hover:text-gray-800">
                    Accessibility
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <p className="text-center text-sm text-gray-500 md:text-left">
              © {new Date().getFullYear()} IRIS-LLM. All rights reserved.
            </p>
            <p className="text-center text-sm text-gray-500 md:text-left">
              Inspired by Stanford's STORM research assistant.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
