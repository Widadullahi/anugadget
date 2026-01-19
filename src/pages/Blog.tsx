import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Top 10 Smartphones to Watch in 2024",
      excerpt: "Discover the most anticipated smartphone releases this year and what makes them stand out...",
      image: "/placeholder.svg",
      category: "Reviews",
      date: "Jan 15, 2024",
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "How to Choose the Right Laptop for Your Needs",
      excerpt: "A comprehensive guide to selecting the perfect laptop based on your requirements...",
      image: "/placeholder.svg",
      category: "Guides",
      date: "Jan 12, 2024",
      readTime: "8 min read",
    },
    {
      id: 3,
      title: "Smartwatch Buying Guide 2024",
      excerpt: "Everything you need to know before purchasing your next smartwatch...",
      image: "/placeholder.svg",
      category: "Guides",
      date: "Jan 10, 2024",
      readTime: "6 min read",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="container px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tech Blog</h1>
            <p className="text-xl text-muted-foreground">
              Latest news, reviews, and guides from the world of technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`}>
                <Card className="hover:shadow-card transition-all hover:-translate-y-1 cursor-pointer h-full">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="mb-3">{post.category}</Badge>
                      <h3 className="font-semibold text-xl mb-2 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
