import { Suspense } from 'react';
import SearchPage from '../Components/Section/Search';
import Header from '../Components/Section/Header';
import Footer from '../Components/Section/Footer';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPage />
    </Suspense>
  );
}
