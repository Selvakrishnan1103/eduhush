"use client";
export const dynamic = "force-dynamic";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/videos?search=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Failed to fetch videos");
        const data = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="pt-28 px-4">
      <h1 className="text-xl font-bold mb-4">
        Search Results for <span className="text-blue-600">"{query}"</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul className="space-y-2">
          {results.map((video) => (
            <li key={video._id} className="p-4 bg-gray-100 rounded shadow">
              <p className="font-semibold">{video.title}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}
