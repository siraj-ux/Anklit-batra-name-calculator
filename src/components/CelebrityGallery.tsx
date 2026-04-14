import { motion } from 'framer-motion';

// Import images (Make sure the path matches your folder structure)
import actor1 from '../assets/Bollywood-Stars/actors (1).jpeg';
import actor2 from '../assets/Bollywood-Stars/actors (2).jpeg';
import actor3 from '../assets/Bollywood-Stars/actors (3).jpeg';
import actor4 from '../assets/Bollywood-Stars/actors (4).jpeg';
import actor5 from '../assets/Bollywood-Stars/actors (5).jpeg';
import actor6 from '../assets/Bollywood-Stars/actors (6).jpeg';
import actor7 from '../assets/Bollywood-Stars/actors (7).jpeg';

const celebrityImages = [
  { img: actor1, num: 1 },
  { img: actor2, num: 2 },
  { img: actor3, num: 3 },
  { img: actor4, num: 4 },
  { img: actor5, num: 5 },
  { img: actor6, num: 6 },
  { img: actor7, num: 7 },
];

// We double the array to create a seamless infinite loop effect
const scrollItems = [...celebrityImages, ...celebrityImages];

export default function CelebrityGallery() {
  return (
    <section className="py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-10 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">
          Stars & Their Numbers
        </h2>
        <p className="text-muted-foreground text-sm">
          Alignment for success
        </p>
      </div>

      {/* Auto-scroll Container */}
      <div className="relative flex overflow-hidden">
        <motion.div
          className="flex gap-6 flex-nowrap"
          animate={{
            x: ['0%', '-50%'], // Moves half the total width (the first set of images)
          }}
          transition={{
            duration: 25, // Adjust this number to change speed (higher = slower)
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {scrollItems.map((celeb, i) => (
            <div 
              key={i} 
              className="relative shrink-0 w-48 md:w-60 h-72 md:h-80 rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              {/* 
                FIX FOR CROPPED IMAGES: 
                'object-cover' fills the space, 
                'object-top' ensures faces aren't cut off if the image is tall 
              */}
              <img
                src={celeb.img}
                alt="Celebrity"
                className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-110"
              />
              
              {/* Overlay for the Number */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                {/* <p className="text-white font-bold text-lg">
                  Number: {celeb.num}
                </p> */}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}