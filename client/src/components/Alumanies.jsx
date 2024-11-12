import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";

const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
    img: "https://resumeworded.com/linkedin-review/img/lir-testimonial.jpeg",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "Smooth and stress-free process with VisaVenture. Love it!.",
    img: "https://d2v5dzhdg4zhx3.cloudfront.net/web-assets/images/storypages/short/linkedin-profile-picture-maker/dummy_image/thumb/001.webp",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
    img: "https://passport-photo.online/images/cms/size_280_author_sylwia_cab85ba8d6.webp?quality=80&format=webp&width=1920",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "Great experience! Found a top-notch agent fast.",
    img: "https://d3dvldql7ksohz.cloudfront.net/000_clients/68998/page/68998M04CJmQn.jpg",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "VisaVenture made my visa process so simple and quick!",
    img: "https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1632213066510-Y4M7JJYPMEJLP1DI4HC2/Andrine+Business+Headshot+London.jpg",
  },
  {
    name: "James",
    username: "@james",
    body: "Found a fantastic visa agent through VisaVenture.",
    img: "https://images.squarespace-cdn.com/content/v1/5cf0d08d5fc69d000172462a/1602248693828-A30UI78F964CGYSAQUWV/image-asset.octet-stream?format=500w",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, name, username, body }) => {
  return (
    <figure
     className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )} >
        
      <div className="flex flex-row items-center gap-2">
        
        <img className=" rounded-full " width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs font-medium dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

 function Alumanies() {
  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-transparent ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-transparent dark:from-background"></div>
    </div>
  );
}

export default Alumanies
