// import Link from 'next/link'
// import { ArrowRight, Download, Mail, Code2, Database, Globe } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { GithubIcon, LinkedinIcon, TwitterIcon } from '@/app/components/icon/brandIcons'


// const skills = [
//   { label: 'Frontend',  items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],  icon: Globe    },
//   { label: 'Backend',   items: ['Node.js', 'Express', 'REST API', 'GraphQL'],        icon: Code2    },
//   { label: 'Database',  items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],         icon: Database },
// ]

// const stats = [
//   { value: '3+',  label: 'Years Experience' },
//   { value: '20+', label: 'Projects Built'   },
//   { value: '10+', label: 'Happy Clients'    },
//   { value: '5+',  label: 'Open Source'      },
// ]

// export default function HomePage() {
//   return (
//     <div className="min-h-screen bg-white dark:bg-zinc-950">

//       {/* ── Hero ── */}
//       <section className="max-w-6xl mx-auto px-4 pt-24 pb-20">
//         <div className="flex flex-col items-start gap-6 max-w-3xl">

//           {/* Badge */}
//           <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
//                            bg-indigo-50 dark:bg-indigo-950
//                            text-indigo-600 dark:text-indigo-400
//                            text-sm font-medium border border-indigo-100 dark:border-indigo-900">
//             <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
//             Available for work
//           </span>

//           {/* Heading */}
//           <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 dark:text-white leading-tight">
//                 Hi, I&apos;m 
//             <span className="text-indigo-600 dark:text-indigo-400"> Ethian Dev</span>
//           </h1>

//           <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-500 dark:text-zinc-400">
//             Full Stack Developer
//           </h2>

//           <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
//             I build fast, scalable, and beautiful web applications from frontend to backend.
//             Passionate about clean code, great user experience, and solving real problems.
//           </p>

//           {/* CTA buttons */}
//           <div className="flex flex-wrap gap-3 pt-2">
//             <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
//               <Link href="/projects">
//                 View Projects <ArrowRight className="w-4 h-4" />
//               </Link>
//             </Button>
//             <Button asChild size="lg" variant="outline" className="gap-2">
//               <Link href="/contact">
//                 <Mail className="w-4 h-4" /> Hire Me
//               </Link>
//             </Button>
//             <Button asChild size="lg" variant="ghost" className="gap-2 text-zinc-600">
//               <a href="/resume.pdf" download>
//                 <Download className="w-4 h-4" /> Resume
//               </a>
//             </Button>
//           </div>

//           {/* Social links */}
//           <div className="flex items-center gap-4 pt-2">
//             <span className="text-sm text-zinc-400">Find me on</span>
//             {[
//               { href: 'https://github.com',   Icon: GithubIcon,   label: 'GitHub'   },
//               { href: 'https://linkedin.com', Icon: LinkedinIcon, label: 'LinkedIn' },
//               { href: 'https://twitter.com',  Icon: TwitterIcon,  label: 'Twitter'  },
//             ].map(({ href, Icon, label }) => (
//               <a
//                 key={href}
//                 href={href}
//                 target="_blank"
//                 rel="noreferrer"
//                 aria-label={label}
//                 className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400
//                            hover:text-zinc-900 dark:hover:text-white
//                            hover:bg-zinc-100 dark:hover:bg-zinc-800
//                            transition-all duration-150 hover:scale-110"
//               >
//                 <Icon className="w-5 h-5" />
//               </a>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Stats ── */}
//       <section className="border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
//         <div className="max-w-6xl mx-auto px-4 py-12">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             {stats.map(({ value, label }) => (
//               <div key={label} className="flex flex-col items-center text-center gap-1">
//                 <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
//                   {value}
//                 </span>
//                 <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ── Skills ── */}
//       <section className="max-w-6xl mx-auto px-4 py-20">
//         <div className="mb-12">
//           <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">
//             What I work with
//           </h2>
//           <p className="text-zinc-500 dark:text-zinc-400">
//             Technologies and tools I use to bring ideas to life.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {skills.map(({ label, items, icon: Icon }) => (
//             <div
//               key={label}
//               className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800
//                          bg-white dark:bg-zinc-900
//                          hover:border-indigo-200 dark:hover:border-indigo-800
//                          hover:shadow-sm transition-all duration-200 group"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950
//                                 flex items-center justify-center
//                                 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900
//                                 transition-colors">
//                   <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
//                 </div>
//                 <h3 className="font-semibold text-zinc-900 dark:text-white">{label}</h3>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {items.map(item => (
//                   <span
//                     key={item}
//                     className="px-3 py-1 text-xs font-medium rounded-full
//                                bg-zinc-100 dark:bg-zinc-800
//                                text-zinc-600 dark:text-zinc-400"
//                   >
//                     {item}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── CTA Banner ── */}
//       <section className="max-w-6xl mx-auto px-4 pb-20">
//         <div className="rounded-2xl bg-indigo-600 dark:bg-indigo-700 p-10 md:p-14
//                         flex flex-col md:flex-row items-center justify-between gap-6">
//           <div>
//             <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
//               Have a project in mind?
//             </h2>
//             <p className="text-indigo-200">
//               Let&apos;s work together and build something great.
//             </p>
//           </div>
//           <div className="flex gap-3 shrink-0">
//             <Button
//               asChild
//               size="lg"
//               className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold gap-2"
//             >
//               <Link href="/contact">
//                 Get in touch <ArrowRight className="w-4 h-4" />
//               </Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//     </div>
//   )
// }



import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight, Download, Mail,
  Code2, Database, Globe, ImageIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  GithubIcon,
  LinkedinIcon,
  TwitterIcon,
} from '@/app/components/icon/brandIcons'

const skills = [
  {
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    icon:  Globe,
  },
  {
    label: 'Backend',
    items: ['Node.js', 'Express', 'REST API', 'GraphQL'],
    icon:  Code2,
  },
  {
    label: 'Database',
    items: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma'],
    icon:  Database,
  },
]

const stats = [
  { value: '3+',  label: 'Years Experience' },
  { value: '20+', label: 'Projects Built'    },
  { value: '10+', label: 'Happy Clients'     },
  { value: '5+',  label: 'Open Source'       },
]

const heroData = {
  name:   'Ethian Dev',
  title:  'Full Stack Developer',
  bio:    'I build fast, scalable, and beautiful web applications from frontend to backend. Passionate about clean code, great user experience, and solving real problems.',
  // image:  null as string | null, 
  image:  'https://i.ibb.co/jZwLHrfT/IMG-20260318-213819.png', 
  resume: '/resume.pdf',
  socials: [
    { href: 'https://github.com',   Icon: GithubIcon,   label: 'GitHub'   },
    { href: 'https://linkedin.com', Icon: LinkedinIcon, label: 'LinkedIn' },
    { href: 'https://twitter.com',  Icon: TwitterIcon,  label: 'Twitter'  },
  ],
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">

      {/* ── Hero Section ── */}
      <section className="max-w-6xl mx-auto px-4 pt-16 md:pt-24 pb-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-8">

          {/* Left: Content */}
          <div className="flex flex-col items-start gap-6 flex-1 max-w-2xl">

            {/* Availability Badge */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              Available for work
            </span>

            {/* Headline */}
            <div className="flex flex-col gap-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white leading-tight">
                Hi, I&apos;m{' '}
                <span className="text-indigo-600 dark:text-indigo-400">
                  {heroData.name}
                </span>
              </h1>
              <h2 className="text-xl sm:text-2xl font-semibold text-zinc-500 dark:text-zinc-400">
                {heroData.title}
              </h2>
            </div>

            {/* Bio */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {heroData.bio}
            </p>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2">
                <Link href="/projects">
                  View Projects <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="gap-2">
                <Link href="/contact">
                  <Mail className="w-4 h-4" /> Hire Me
                </Link>
              </Button>

              <Button asChild size="lg" variant="ghost" className="gap-2 text-zinc-600 dark:text-zinc-400">
                <a href={heroData.resume} download>
                  <Download className="w-4 h-4" /> Resume
                </a>
              </Button>
            </div>

            {/* Social Links - FIXED MISSING <a> TAG */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-zinc-400">Find me on</span>
              {heroData.socials.map(({ href, Icon, label }) => (
                <a 
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all duration-150 hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Right: Visual Section */}
          <div className="shrink-0 w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80">
            <div className="relative w-full h-full">

              {/* Decorative spinning ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-200 dark:border-indigo-800 animate-[spin_10s_linear_infinite]" />

              {/* Inner Circle Border */}
              <div className="absolute inset-3 rounded-full border-2 border-indigo-100 dark:border-indigo-900" />

              {/* Profile Image Container */}
              <div className="absolute inset-4 rounded-full overflow-hidden border-2 border-white dark:border-zinc-700 shadow-xl shadow-indigo-100 dark:shadow-indigo-950 bg-indigo-50 dark:bg-indigo-950">
                {heroData.image ? (
                  <Image
                    src={heroData.image}
                    alt={heroData.name}
                    fill
                    className="object-cover object-center"
                    priority
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="w-10 h-10 text-indigo-300 dark:text-indigo-700" />
                    <span className="text-xs font-medium text-indigo-300 dark:text-indigo-700">Photo</span>
                  </div>
                )}
              </div>

              {/* Floating Badges */}
              <div className="absolute top-2 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">Open to work</span>
              </div>

              <div className="absolute bottom-4 -left-2 px-3 py-2 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 shadow-md">
                <p className="text-xs font-bold text-zinc-900 dark:text-white">3+ Years</p>
                <p className="text-xs text-zinc-400 dark:text-zinc-500">Experience</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Statistics Section ── */}
      <section className="border-y border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="flex flex-col items-center text-center gap-1">
                <span className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">{value}</span>
                <span className="text-sm text-zinc-500 dark:text-zinc-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills Section ── */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-3">What I work with</h2>
          <p className="text-zinc-500 dark:text-zinc-400">Technologies and tools I use to bring ideas to life.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {skills.map(({ label, items, icon: Icon }) => (
            <div
              key={label}
              className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:shadow-sm transition-all duration-200 group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 flex items-center justify-center group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors">
                  <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">{label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(item => (
                  <span
                    key={item}
                    className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact CTA Section ── */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-2xl p-10 md:p-14 bg-indigo-600 dark:bg-indigo-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Have a project in mind?</h2>
            <p className="text-indigo-200">Let&apos;s work together and build something great.</p>
          </div>
          <Button asChild size="lg" className="shrink-0 bg-white text-indigo-600 hover:bg-indigo-50 font-semibold gap-2">
            <Link href="/contact">
              Get in touch <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

    </div>
  )
}