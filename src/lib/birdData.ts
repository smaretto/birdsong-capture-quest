
export interface Bird {
  id: string;
  name: string;
  scientificName: string;
  description: string;
  habitat: string[];
  size: string;
  imageUrl: string;
  audioUrl?: string;
  capturedAt?: Date;
  location?: string;
}

export interface RecordedBird extends Bird {
  audioUrl: string;
  capturedAt: Date;
  location: string;
}

// Sample data for our app
export const sampleBirds: Bird[] = [
  {
    id: "1",
    name: "European Robin",
    scientificName: "Erithacus rubecula",
    description: "The European robin is a small insectivorous passerine bird that belongs to the chat subfamily of the Old World flycatcher family. It is known for its orange-red breast, face, and throat.",
    habitat: ["Woodland", "Garden", "Park"],
    size: "Small (14cm)",
    imageUrl: "https://images.unsplash.com/photo-1591608971358-f93643d31b43?q=80&w=880&auto=format&fit=crop",
  },
  {
    id: "2",
    name: "Common Nightingale",
    scientificName: "Luscinia megarhynchos",
    description: "The common nightingale is a small passerine bird best known for its powerful and beautiful song. It is slightly larger than the European robin, with a robust, broad-tailed, rather plain brown appearance.",
    habitat: ["Woodland", "Thicket", "Garden"],
    size: "Small (15-16.5cm)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Luscinia_megarhynchos_-_Nightingale_-_Zuidelijke_Nachtegaal.jpg",
  },
  {
    id: "3",
    name: "Eurasian Blackbird",
    scientificName: "Turdus merula",
    description: "The common blackbird is a species of true thrush. It is also called the Eurasian blackbird, or simply the blackbird. The male has all-black plumage, a yellow eye-ring and an orange-yellow bill.",
    habitat: ["Woodland", "Urban", "Garden"],
    size: "Medium (24-25cm)",
    imageUrl: "https://images.unsplash.com/photo-1621852003687-0aa977152ef8?q=80&w=880&auto=format&fit=crop",
  },
  {
    id: "4",
    name: "Song Thrush",
    scientificName: "Turdus philomelos",
    description: "The song thrush is a thrush that breeds across the West Palearctic. It has brown upper-parts and black-spotted cream or buff underparts and has three recognized subspecies.",
    habitat: ["Woodland", "Garden", "Parkland"],
    size: "Medium (23cm)",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Song_Thrush_%28Turdus_philomelos%29.jpg",
  },
  {
    id: "5",
    name: "Common Chaffinch",
    scientificName: "Fringilla coelebs",
    description: "The common chaffinch is a small passerine bird in the finch family. The male is brightly colored with a blue-grey cap and rust-red underparts.",
    habitat: ["Woodland", "Garden", "Farmland"],
    size: "Small (14-16cm)",
    imageUrl: "https://images.unsplash.com/photo-1661870417772-3db203be81f5?q=80&w=687&auto=format&fit=crop",
  },
];

// Initial state for user's captured birds collection
export const initialCapturedBirds: RecordedBird[] = [];

// Helper function to create a new recorded bird
export const createRecordedBird = (
  bird: Bird,
  audioUrl: string,
  location: string
): RecordedBird => {
  return {
    ...bird,
    audioUrl,
    capturedAt: new Date(),
    location,
  };
};
