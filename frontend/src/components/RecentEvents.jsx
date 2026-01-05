import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { X, ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function RecentEvents() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [recentEvents, setRecentEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedEvent, setSelectedEvent] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/events');
                if (response.data.success && response.data.data.length > 0) {
                    const sortedEvents = response.data.data.sort((a, b) => {
                        if (a.isActive === b.isActive) return 0;
                        return a.isActive ? -1 : 1;
                    });
                    setRecentEvents(sortedEvents);
                } else {
                    setRecentEvents([
                        {
                            title: 'Tech Summit 2025',
                            date: 'December 15, 2025',
                            image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop',
                            category: 'Conference',
                            isActive: true
                        },
                        {
                            title: 'Hackathon Week',
                            date: 'December 5-10, 2025',
                            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop',
                            category: 'Competition',
                            isActive: true
                        },
                        {
                            title: 'Cultural Festival',
                            date: 'November 28, 2025',
                            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop',
                            category: 'Cultural',
                            isActive: false
                        }
                    ]);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
                setRecentEvents([
                    {
                        title: 'Tech Summit 2025',
                        date: 'December 15, 2025',
                        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=500&fit=crop',
                        category: 'Conference',
                        isActive: true
                    },
                    {
                        title: 'Hackathon Week',
                        date: 'December 5-10, 2025',
                        image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop',
                        category: 'Competition',
                        isActive: true
                    },
                    {
                        title: 'Cultural Festival',
                        date: 'November 28, 2025',
                        image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=500&fit=crop',
                        category: 'Cultural',
                        isActive: false
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handlePrevious = () => {
        setActiveIndex((prev) => (prev === 0 ? recentEvents.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setActiveIndex((prev) => (prev === recentEvents.length - 1 ? 0 : prev + 1));
    };

    const getVisibleCards = () => {
        if (recentEvents.length === 0) return [];
        const prevIndex = activeIndex === 0 ? recentEvents.length - 1 : activeIndex - 1;
        const nextIndex = activeIndex === recentEvents.length - 1 ? 0 : activeIndex + 1;
        return [
            { event: recentEvents[prevIndex], position: 'left', index: prevIndex },
            { event: recentEvents[activeIndex], position: 'center', index: activeIndex },
            { event: recentEvents[nextIndex], position: 'right', index: nextIndex }
        ];
    };

    if (loading) return null;

    return (
        <section className="py-24 bg-slate-50 relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-red-500/5 to-transparent blur-3xl" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] rounded-full bg-gradient-to-bl from-blue-500/5 to-transparent blur-3xl" />
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4"
                    >
                        Recent Events
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-slate-600 max-w-2xl mx-auto"
                    >
                        Explore the vibrant moments and memorable experiences from our campus
                    </motion.p>
                </div>

                <div className="relative flex items-center justify-center min-h-[600px]">
                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 md:left-10 z-30 p-4 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/50 shadow-xl transition-all duration-300 hover:scale-110"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={handleNext}
                        className="absolute right-0 md:right-10 z-30 p-4 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-400 hover:text-red-500 hover:border-red-500/50 shadow-xl transition-all duration-300 hover:scale-110"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Cards Container */}
                    <div className="flex items-center justify-center w-full h-full perspective-1000">
                        <AnimatePresence mode='popLayout'>
                            {getVisibleCards().map(({ event, position, index }) => (
                                <motion.div
                                    key={`${event.title}-${index}`}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        scale: 0.9,
                                        x: position === 'left' ? -200 : position === 'right' ? 200 : 0,
                                        y: 20
                                    }}
                                    animate={{
                                        opacity: position === 'center' ? 1 : 0.5,
                                        scale: position === 'center' ? 1 : 0.88,
                                        x: position === 'left' ? '-55%' : position === 'right' ? '55%' : '0%',
                                        y: position === 'center' ? 0 : 15,
                                        zIndex: position === 'center' ? 20 : 10,
                                        rotateY: position === 'left' ? 12 : position === 'right' ? -12 : 0
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: 0.85,
                                        x: position === 'left' ? -200 : 200,
                                        transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        type: 'spring',
                                        stiffness: 120,
                                        damping: 18,
                                        mass: 0.8
                                    }}
                                    className={`absolute cursor-pointer rounded-3xl overflow-hidden shadow-2xl ${position === 'center' ? 'w-[320px] md:w-[400px] h-[550px]' : 'w-[280px] md:w-[350px] h-[450px]'
                                        }`}
                                    onClick={() => position === 'center' && setSelectedEvent(event)}
                                >
                                    <div className="relative w-full h-full bg-slate-900 group">
                                        <img
                                            src={event.image || event.imageUrl}
                                            alt={event.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90" />

                                        <div className="absolute top-6 right-6">
                                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-md ${event.isActive
                                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                                : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
                                                }`}>
                                                {event.isActive ? 'Upcoming' : 'Past'}
                                            </span>
                                        </div>

                                        <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                            <div className="flex items-center gap-2 mb-3 text-red-500 font-semibold text-sm uppercase tracking-wider">
                                                <span>{event.category}</span>
                                                <span className="w-1 h-1 bg-red-500 rounded-full" />
                                                <span>{event.date}</span>
                                            </div>
                                            <h3 className="text-3xl font-serif font-bold text-white mb-4 leading-tight">
                                                {event.title}
                                            </h3>
                                            <div className="flex items-center gap-2 text-white/70 group-hover:text-white transition-colors">
                                                <span className="text-sm font-medium">View Details</span>
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Indicators */}
                <div className="flex justify-center items-center gap-2 mt-12">
                    {recentEvents.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${index === activeIndex ? 'w-8 bg-red-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                        />
                    ))}
                </div>
            </div>

            {/* Event Detail Modal */}
            <AnimatePresence>
                {selectedEvent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-slate-900/90 backdrop-blur-md flex items-center justify-center z-50 p-4"
                        onClick={() => setSelectedEvent(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-[2rem] max-w-4xl w-full overflow-hidden shadow-2xl relative"
                        >
                            <button
                                onClick={() => setSelectedEvent(null)}
                                className="absolute top-4 right-4 z-10 p-2 bg-black/10 hover:bg-black/20 rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-800" />
                            </button>

                            <div className="grid md:grid-cols-2">
                                <div className="h-64 md:h-96 lg:h-auto overflow-hidden">
                                    <img
                                        src={selectedEvent.image || selectedEvent.imageUrl}
                                        alt={selectedEvent.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-8 md:p-12 flex flex-col justify-center bg-white">
                                    <span className="text-red-600 font-bold tracking-widest uppercase text-sm mb-2">{selectedEvent.category}</span>
                                    <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                                        {selectedEvent.title}
                                    </h2>
                                    <div className="flex items-center gap-2 text-slate-500 mb-8 max-w-md">
                                        <Calendar className="w-5 h-5" />
                                        <span className="font-medium text-lg">{selectedEvent.date}</span>
                                    </div>
                                    <p className="text-slate-600 leading-relaxed mb-8">
                                        {selectedEvent.title} is a premier event showcasing innovation and talent. Join us to witness the future of technology and creativity.
                                    </p>

                                    {selectedEvent.isActive && (
                                        <button className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-red-600 transition-colors self-start flex items-center gap-3">
                                            Register Now <ArrowRight className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}

export default RecentEvents;
