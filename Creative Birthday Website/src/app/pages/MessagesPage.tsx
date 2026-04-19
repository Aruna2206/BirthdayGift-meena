import { motion } from 'motion/react';
import { Heart, Mail, Sparkles } from 'lucide-react';

export function MessagesPage() {
  const messages = [
    {
      title: '💌 To The One My Heart Chose',
      message: `My Forever Decision 💌
Happy Birthday, my soulmate 💖
Out of everyone in this world… my heart chose you.

Not once, not twice…
But every single day, I keep choosing you again and again.

Even if everything fades…
My love for you will remain forever 💫`,
      date: '💌 Forever & Always',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: 'My Reason, My Everything',
      message: `Happy Birthday, my heart ❤️
Just because I don’t say it often… doesn’t mean I don’t feel it deeply.

You are the reason behind my smile…
The strength behind my tears…

Without you, I am incomplete…
With you, I am everything 💖`,
      date: 'With All My Heart',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: '💌 My Forever Decision',
      message: `Happy Birthday, my soulmate 💞
Life gave me many choices…
But loving you was never a decision… it just happened.

And now, no matter what comes…
I will never choose a life without you.

You are my today… my tomorrow… my forever 💖`,
      date: 'Your Birthday 🎂',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: '💌 My Dream, My Reality',
      message: `Happy Birthday, my love 💕
You were once just a dream…
but now you are my reality.

Every moment with you feels unreal…
like a beautiful story I never want to end.

Stay with me forever…
because losing you is my biggest fear 💫`,
      date: 'Celebrating Us 💕',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: '💌 The Only Dream I Want',
      message: `Happy Birthday, my heart 💖
Out of all the dreams I’ve ever had…
you are the only one I want to come true.

Even if life changes everything…
my heart will never change you.

Because you are my dream…
and my forever ❤️`,
      date: 'Every Single Day',
      color: 'from-pink-500 to-rose-500'
    },
    {
      title: '💌 The Love I’ll Never Let Go',
      message: `Happy Birthday, my dearest ❤️
Just because things get hard… doesn’t mean I’ll give up on us.

I will hold on…
I will fight for us…

Because what we have is rare…
And I will never let you go 💫`,
      date: 'Until The End of Time',
      color: 'from-pink-500 to-rose-500'
    },
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mail className="text-pink-500" size={48} />
          <h2 className="text-6xl font-bold bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
            Love Letters
          </h2>
        </div>
        <p className="text-2xl text-gray-600">
          Messages from my heart to yours 💌
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.15, duration: 0.6 }}
            whileHover={{ scale: 1.03, rotate: index % 2 === 0 ? 1 : -1 }}
            className="relative"
          >
            <div className={`absolute -top-3 -right-3 bg-gradient-to-br ${msg.color} p-4 rounded-full shadow-lg`}>
              <Heart size={24} fill="white" className="text-white" />
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border-4 border-pink-200">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="text-pink-500" size={24} />
                <h3 className={`text-3xl font-bold bg-gradient-to-r ${msg.color} bg-clip-text text-transparent`}>
                  {msg.title}
                </h3>
              </div>

              <p className="text-gray-700 leading-relaxed text-lg mb-6 min-h-[120px]">
                {msg.message}
              </p>

              <div className="flex justify-between items-center pt-4 border-t-2 border-pink-200">
                <p className="text-sm text-gray-500 italic">{msg.date}</p>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    >
                      <Heart size={16} fill="currentColor" className="text-pink-500" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
