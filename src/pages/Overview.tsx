
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { RecordedBird, sampleBirds, initialCapturedBirds } from '../lib/birdData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MapPin, Bird, ChevronRight } from 'lucide-react';

// For demo purposes, let's create some sample recorded birds with different locations
const demoRecordedBirds: RecordedBird[] = [
  {
    ...sampleBirds[0],
    audioUrl: 'sample-audio-url-1',
    capturedAt: new Date('2023-05-15'),
    location: 'United Kingdom'
  },
  {
    ...sampleBirds[1],
    audioUrl: 'sample-audio-url-2',
    capturedAt: new Date('2023-06-22'),
    location: 'France'
  },
  {
    ...sampleBirds[2],
    audioUrl: 'sample-audio-url-3',
    capturedAt: new Date('2023-07-10'),
    location: 'Germany'
  },
  {
    ...sampleBirds[0], // Same bird as first entry but different location
    audioUrl: 'sample-audio-url-4',
    capturedAt: new Date('2023-08-05'),
    location: 'Spain'
  },
  {
    ...sampleBirds[3],
    audioUrl: 'sample-audio-url-5',
    capturedAt: new Date('2023-09-12'),
    location: 'France'
  },
];

const Overview = () => {
  const navigate = useNavigate();
  const [capturedBirds] = useState<RecordedBird[]>(demoRecordedBirds); // In a real app, this would be from a context or API
  
  // Group birds by country
  const birdsByCountry = capturedBirds.reduce<Record<string, RecordedBird[]>>((acc, bird) => {
    if (!acc[bird.location]) {
      acc[bird.location] = [];
    }
    acc[bird.location].push(bird);
    return acc;
  }, {});
  
  // Sort countries by number of birds (descending)
  const sortedCountries = Object.keys(birdsByCountry).sort(
    (a, b) => birdsByCountry[b].length - birdsByCountry[a].length
  );
  
  // Get total unique bird count
  const uniqueBirdIds = new Set(capturedBirds.map(bird => bird.id));
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold text-nature-900">Birds by Location</h1>
          <p className="text-nature-600">
            Track bird populations across different countries and regions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Countries</CardTitle>
              <CardDescription>Locations where birds were recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-nature-600">
                {sortedCountries.length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Recordings</CardTitle>
              <CardDescription>Total bird songs recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-nature-600">
                {capturedBirds.length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Unique Birds</CardTitle>
              <CardDescription>Different species recorded</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-nature-600">
                {uniqueBirdIds.size}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="accordion" className="w-full">
          <TabsList className="w-full md:w-auto">
            <TabsTrigger value="accordion">List View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          
          <TabsContent value="accordion" className="mt-6">
            <Accordion type="single" collapsible className="w-full">
              {sortedCountries.map(country => (
                <AccordionItem key={country} value={country}>
                  <AccordionTrigger className="hover:no-underline">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-nature-600" />
                      <span className="font-medium">{country}</span>
                      <span className="text-sm text-nature-500 font-normal ml-2">
                        ({birdsByCountry[country].length} {birdsByCountry[country].length === 1 ? 'bird' : 'birds'})
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pl-6 divide-y divide-nature-100">
                      {birdsByCountry[country].map((bird, idx) => (
                        <div 
                          key={`${bird.id}-${idx}`}
                          className="py-3 flex items-center justify-between cursor-pointer hover:bg-nature-50 rounded-md px-2"
                          onClick={() => navigate(`/bird/${bird.id}`)}
                        >
                          <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full overflow-hidden bg-nature-100">
                              <img 
                                src={bird.imageUrl} 
                                alt={bird.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{bird.name}</div>
                              <div className="text-sm text-nature-500">{bird.scientificName}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-sm text-nature-500">
                              {new Date(bird.capturedAt).toLocaleDateString()}
                            </div>
                            <ChevronRight className="h-4 w-4 text-nature-400" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
          
          <TabsContent value="table" className="mt-6">
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Country</TableHead>
                      <TableHead>Bird</TableHead>
                      <TableHead>Scientific Name</TableHead>
                      <TableHead>Date Recorded</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {capturedBirds.map((bird, idx) => (
                      <TableRow 
                        key={`${bird.id}-${idx}`}
                        onClick={() => navigate(`/bird/${bird.id}`)}
                        className="cursor-pointer"
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-nature-500" />
                            <span>{bird.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <div className="h-8 w-8 rounded-full overflow-hidden bg-nature-100">
                              <img 
                                src={bird.imageUrl} 
                                alt={bird.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span>{bird.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="italic text-nature-600">{bird.scientificName}</TableCell>
                        <TableCell>{new Date(bird.capturedAt).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Overview;
