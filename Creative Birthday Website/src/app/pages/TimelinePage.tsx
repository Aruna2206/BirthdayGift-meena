import { motion } from 'motion/react';
import { Heart, Star, Sparkles, Gift, Plane, Home as HomeIcon, Camera } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export function TimelinePage() {
  const photoIds = [
    '1518568814500-bf0f8d125f46', '1516589178581-6cd7833ae3b2', '1519741497674-611481863552',
    '1522673607217-f9d318255e57', '1518199266791-5375a83190b7', '1515934751353-56fcd60fce29',
  ];

  const timeline = [
    {
      year: 'First Meeting',
      title: 'The Day Everything Changed',
      description: 'When our eyes first met, I knew you were special. That moment changed my life forever.',
      icon: Heart,
      color: 'from-pink-500 to-rose-500',
      photos: [0, 1, 2]
    },
    {
      year: 'First Date',
      title: 'A Perfect Evening',
      description: 'Our first date was magical. Every moment with you felt like a dream come true.',
      icon: Star,
      color: 'from-pink-500 to-rose-500',
      photos: [1, 2, 3]
    },
    {
      year: 'First Trip',
      title: 'Adventures Together',
      description: 'Exploring the world hand in hand, creating memories that will last a lifetime.',
      icon: Plane,
      color: 'from-pink-500 to-rose-500',
      photos: [2, 3, 4]
    },
    {
      year: 'First "I Love You"',
      title: 'Three Magic Words',
      description: 'The moment I said those three words and you said them back - pure magic!',
      icon: Sparkles,
      color: 'from-pink-500 to-rose-500',
      photos: [3, 4, 5]
    },
    {
      year: 'Special Moments',
      title: 'A Thousand Little Things',
      description: 'From movie nights to morning coffee, every moment with you is special.',
      icon: Gift,
      color: 'from-pink-500 to-rose-500',
      photos: [4, 5, 0]
    },
    {
      year: 'Today & Forever',
      title: 'Our Future Together',
      description: 'Every day with you is a gift. Here\'s to many more years of love and happiness!',
      icon: HomeIcon,
      color: 'from-pink-500 to-rose-500',
      photos: [5, 0, 1]
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent mb-4">
          Our Love Timeline
        </h2>
        <p className="text-2xl text-gray-600">
          The beautiful story of us, moment by moment 💕
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative">
        {/* Timeline line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-400 via-rose-400 to-red-400" />

        {timeline.map((item, index) => {
          const isEven = index % 2 === 0;
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isEven ? -100 : 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className={`flex flex-col md:flex-row items-center mb-20 ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
            >
              <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'}`}>
                <motion.div
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-xl"
                >
                  <h3 className={`text-3xl font-bold mb-3 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-semibold mb-3 text-lg">{item.year}</p>
                  <p className="text-gray-700 leading-relaxed text-lg mb-6">{item.description}</p>

                  {/* Photo gallery for this timeline event */}
                  <div className="flex gap-2 justify-center md:justify-start mt-4">
                    {item.photos.map((photoIndex, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="w-20 h-20 rounded-xl overflow-hidden shadow-lg"
                      >
                        <ImageWithFallback
                          src={`https://images.unsplash.com/photo-${photoIds[photoIndex]}?auto=format&fit=crop&w=200&q=80`}
                          alt={`${item.title} photo ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              <div className="w-full md:w-2/12 flex justify-center my-6 md:my-0">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`relative z-10 bg-gradient-to-br ${item.color} p-6 rounded-full shadow-2xl`}
                >
                  <Icon className="text-white" size={40} fill="white" />
                </motion.div>
              </div>

              <div className="w-full md:w-5/12" />
            </motion.div>
          );
        })}
      </div>

      {/* Photo Stats */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="mt-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-3xl p-10 text-white text-center shadow-2xl"
      >
        <Camera size={60} className="mx-auto mb-4" />
        <h3 className="text-4xl font-bold mb-4">100+ Photos Across Our Timeline</h3>
        <p className="text-xl opacity-90">
          Each moment captured, each memory preserved, all leading to this special day!
        </p>
      </motion.div> */}
    </div>
  );
}
