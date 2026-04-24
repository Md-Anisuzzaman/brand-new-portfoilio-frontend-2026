"use client";
import { useState, useRef } from "react";
import {
  X,
  Save,
  Loader2,
  ImageIcon,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import { AboutHero } from "@/lib/types/about";
import { inputCls, labelCls } from "@/components/ui/shared";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  hero: AboutHero;
  onSave: (data: Partial<AboutHero>) => Promise<void>;
  onCancel: () => void;
}

export function HeroModal({ hero, onSave, onCancel }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(hero.name);
  const [title, setTitle] = useState(hero.title);
  const [subtitle, setSubtitle] = useState(hero.subtitle);
  const [location, setLocation] = useState(hero.location);
  const [experience, setExperience] = useState(hero.experience);
  const [resumeUrl, setResumeUrl] = useState(hero.resumeUrl);
  const [image, setImage] = useState(hero.image ?? "");
  const [imageError, setImageError] = useState(false);
  const [bio, setBio] = useState<string[]>(hero.bio.length ? hero.bio : [""]);

  // FIX: New State - Toggle between 'url' and 'upload'
  const [uploadMode, setUploadMode] = useState<"url" | "upload">(
    hero.image?.startsWith("data:") ? "upload" : "url",
  );

  // FIX: Handle Image Upload (Converts file to Base64 string)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // This string will be saved to MongoDB
        setImageError(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // Biography array helpers
  function updateBio(i: number, val: string) {
    setBio((prev) => prev.map((p, idx) => (idx === i ? val : p)));
  }
  function addBio() {
    setBio((prev) => [...prev, ""]);
  }
  function removeBio(i: number) {
    if (bio.length <= 1) return;
    setBio((prev) => prev.filter((_, idx) => idx !== i));
  }

  // Submit logic
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !title.trim()) return;
    setLoading(true);
    await onSave({
      name,
      title,
      subtitle,
      location,
      experience,
      resumeUrl,
      image: image.trim() || null,
      bio: bio.filter((p) => p.trim()),
    });
    setLoading(false);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4
                    bg-zinc-950/60 backdrop-blur-sm overflow-y-auto"
    >
      <div
        className="w-full max-w-2xl my-4 bg-white dark:bg-zinc-900
                      rounded-2xl border border-zinc-200 dark:border-zinc-800
                      shadow-2xl"
      >
        {/* Header - Remains same */}
        <div
          className="sticky top-0 z-10 flex items-center justify-between p-6
                        border-b border-zinc-100 dark:border-zinc-800
                        bg-white dark:bg-zinc-900 rounded-t-2xl"
        >
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Edit Hero Section
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 flex flex-col gap-5 max-h-[70vh] overflow-y-auto">
            {/* Profile Image - Hybrid Upload/URL Section (UPDATED) */}

            {/* Profile Image Section */}
            <div className="flex flex-col gap-1.5 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/50">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-2">
                  <label className={cn(labelCls, "mb-0")}>Profile Image</label>
                  {uploadMode === "url" && (
                    <span className="text-[10px] text-zinc-400 font-medium animate-in fade-in duration-300">
                      (Supports ImgBB / Cloudinary)
                    </span>
                  )}
                </div>

                {/* Mode Toggle Switch */}
                <div className="flex bg-zinc-100 dark:bg-zinc-800 p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <button
                    type="button"
                    onClick={() => setUploadMode("url")}
                    className={cn(
                      "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                      uploadMode === "url"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-600"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                    )}
                  >
                    URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMode("upload")}
                    className={cn(
                      "px-3 py-1 text-[10px] font-bold rounded-md transition-all",
                      uploadMode === "upload"
                        ? "bg-white dark:bg-zinc-700 shadow-sm text-indigo-600"
                        : "text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300",
                    )}
                  >
                    UPLOAD
                  </button>
                </div>
              </div>

              {/* Alignment Row - items-center ensures perfect vertical centering */}
              <div className="flex gap-4 items-center">
                <div className="flex-1 relative">
                  {" "}
                  {/* added relative for the absolute text */}
                  {uploadMode === "url" ? (
                    <>
                      <input
                        type="text"
                        placeholder="https://i.ibb.co/..."
                        value={image}
                        onChange={(e) => {
                          setImage(e.target.value);
                          setImageError(false);
                        }}
                        className={inputCls}
                      />
                      <p className="absolute -bottom-5 left-1 text-[10px] text-zinc-400 whitespace-nowrap">
                        Example: ImgBB or Cloudinary direct link
                      </p>
                    </>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="group cursor-pointer w-full px-4 py-2.5 border-2 border-dashed border-zinc-200 dark:border-zinc-700 rounded-xl flex items-center justify-center gap-2.5 hover:border-indigo-500 hover:bg-white dark:hover:bg-zinc-800 transition-all bg-zinc-50 dark:bg-zinc-800/50"
                    >
                      <Upload className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500" />
                      <span className="text-xs text-zinc-500 group-hover:text-indigo-500 font-medium">
                        {image.startsWith("data:")
                          ? "Change Image"
                          : "Choose Local Image"}
                      </span>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  )}
                </div>

                {/* The Circle - Perfectly Centered */}
                <div
                  className="w-16 h-16 rounded-full overflow-hidden shrink-0
                border-2 border-zinc-200 dark:border-zinc-700
                bg-zinc-100 dark:bg-zinc-800
                flex items-center justify-center relative shadow-sm"
                >
                  {image && !imageError ? (
                    <Image
                      src={image}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                      onError={() => setImageError(true)}
                      // Base64 strings and dynamic external URLs should usually be unoptimized
                      // to avoid Next.js Image Optimization API limits/costs if they change frequently
                      unoptimized
                    />
                  ) : (
                    <ImageIcon className="w-6 h-6 text-zinc-400" />
                  )}
                </div>
              </div>
            </div>

            {/* Rest of the form (Name, Title, Subtitle, etc.) - Remains same */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Full Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ethian Dev"
                  className={inputCls}
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Job Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Full Stack Developer"
                  className={inputCls}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Subtitle / Tagline</label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="I turn ideas..."
                className={inputCls}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Remote"
                  className={inputCls}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Experience</label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="3+ Years"
                  className={inputCls}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Resume / CV URL</label>
              <input
                type="text"
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="/resume.pdf"
                className={inputCls}
              />
            </div>

            {/* Bio section - Remains same */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className={labelCls}>
                  Bio{" "}
                  <span className="text-zinc-400 normal-case font-normal">
                    ({bio.filter((p) => p.trim()).length} paragraphs)
                  </span>
                </label>
                <button
                  type="button"
                  onClick={addBio}
                  className="flex items-center gap-1 text-xs font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  <Plus className="w-3.5 h-3.5" /> Add paragraph
                </button>
              </div>
              <div className="flex flex-col gap-3">
                {bio.map((para, i) => (
                  <div key={i} className="flex gap-2.5 items-start">
                    <span className="text-[10px] font-mono text-zinc-400 mt-3.5 w-4 text-center shrink-0">
                      {i + 1}
                    </span>
                    <textarea
                      rows={3}
                      value={para}
                      onChange={(e) => updateBio(i, e.target.value)}
                      placeholder={`Paragraph ${i + 1}...`}
                      className={cn(inputCls, "flex-1 resize-none")}
                    />
                    <button
                      type="button"
                      onClick={() => removeBio(i)}
                      disabled={bio.length <= 1}
                      className="mt-2.5 p-2 rounded-lg text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 disabled:opacity-30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer - Remains same */}
          <div className="flex gap-3 p-6 border-t border-zinc-100 dark:border-zinc-800">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-700 disabled:opacity-60 text-white transition-colors"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" /> Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
