export interface Vehicle {
  id: number;
  brand: string;
  model: string;
  name: string;
  category: string;
  subtitle: string;
  highlight: string;
  price: string;
  priceValue: number;
  year: number;
  engine: string;
  power: string;
  speed: string;
  fuel: string;
  transmission: string;
  drive: string;
  features: string[];
  image: string;
  images?: string[];
}

const v = (
  id: number,
  brand: string,
  model: string,
  category: string,
  subtitle: string,
  highlight: string,
  year: number,
  priceValue: number,
  engine: string,
  power: string,
  speed: string,
  fuel: string,
  transmission: string,
  drive: string,
  features: string[],
  image: string
): Vehicle => ({
  id,
  brand,
  model,
  name: `${brand} ${model}`,
  category,
  subtitle,
  highlight,
  price: `₦${priceValue.toLocaleString("en-US")}`,
  priceValue,
  year,
  engine,
  power,
  speed,
  fuel,
  transmission,
  drive,
  features,
  image,
});

export const vehicles: Vehicle[] = [
  v(1, "Mercedes-Benz", "S-Class", "Sedan", "The Best or Nothing", "TIMELESS LUXURY", 2024, 85000000, "3.0L Inline-6 Turbo", "429 HP", "0-100 in 4.9s", "Petrol", "Automatic", "RWD", ["AMG Line Package", "Burmester 4D Surround", "MBUX Hyperscreen", "Rear-Axle Steering"], "/vehicles/mercedes-s-class.jpg"),
  v(2, "Mercedes-Benz", "AMG C63 S", "Sedan", "Born on the Track", "BRUTAL PRECISION", 2023, 72000000, "2.0L Turbo + Hybrid", "680 HP", "0-100 in 3.4s", "Petrol", "Automatic", "AWD", ["AMG Performance Seats", "Race Mode", "Active Ride Control", "AMG Drift Mode"], "/vehicles/amg-c63.jpg"),
  v(3, "Mercedes-Benz", "G-Wagon", "SUV", "Icon. Legend.", "OFF-ROAD ROYALTY", 2024, 142000000, "4.0L V8 Biturbo", "585 HP", "0-100 in 4.5s", "Petrol", "Automatic", "4WD", ["Three Locking Differentials", "AMG Styling", "Burmester Sound", "Luxury Rear Seats"], "/vehicles/gwagen.jpg"),
  v(4, "Mercedes-Benz", "AMG GT", "Coupe", "Handcrafted by AMG", "GRAND TOURER", 2023, 120000000, "4.0L V8 Biturbo", "577 HP", "0-100 in 3.6s", "Petrol", "Automatic", "RWD", ["AMG Performance Exhaust", "Active Aero", "Carbon Interior", "Race Start"], "/vehicles/amg-gt.jpg"),
  v(5, "BMW", "X7 M60i", "SUV", "The Ultimate Driving Machine", "DOMINANT PRESENCE", 2024, 72000000, "4.4L V8 Twin-Turbo", "523 HP", "0-100 in 4.7s", "Petrol", "Automatic", "AWD", ["M Sport Package", "Sky Lounge Panorama", "Driving Assistant Pro", "Air Suspension"], "/vehicles/bmw-x7.jpg"),
  v(6, "BMW", "M4 Competition", "Coupe", "Never Stop Exploring", "DRIVING PERFECTION", 2024, 95000000, "3.0L Inline-6 Twin-Turbo", "503 HP", "0-100 in 3.5s", "Petrol", "Automatic", "RWD", ["M Carbon Bucket Seats", "M Drift Analyzer", "Carbon Roof", "M xDrive"], "/vehicles/bmw-m4.jpg"),
  v(7, "BMW", "M5 Competition", "Sedan", "Sheer Driving Pleasure", "ULTIMATE SEDAN", 2024, 82000000, "4.4L V8 Twin-Turbo", "617 HP", "0-100 in 3.2s", "Petrol", "Automatic", "AWD", ["M Sport Exhaust", "Executive Package", "Laser Headlights", "M Compound Brakes"], "/vehicles/bmw-m5.jpg"),
  v(8, "BMW", "X5 xDrive40i", "SUV", "Sheer Driving Pleasure", "VERSATILE AUTHORITY", 2023, 55000000, "3.0L Inline-6 Turbo", "340 HP", "0-100 in 5.4s", "Petrol", "Automatic", "AWD", ["Panoramic Sky Lounge", "Harman Kardon Sound", "Adaptive Suspension", "Gesture Control"], "/vehicles/bmw-x5.jpg"),
  v(9, "Range Rover", "Autobiography", "SUV", "Above & Beyond", "EXECUTIVE COMMAND", 2024, 95000000, "4.4L V8 Twin-Turbo", "523 HP", "0-100 in 4.6s", "Diesel", "Automatic", "4WD", ["Executive Class Seats", "Meridian Signature Sound", "Terrain Response 2", "Pixel LED Lights"], "/vehicles/range-rover.jpg"),
  v(10, "Range Rover", "Sport HSE", "SUV", "Confident in All Conditions", "REFINED POWER", 2023, 76000000, "3.0L Inline-6 Turbo", "400 HP", "0-100 in 5.7s", "Petrol", "Automatic", "4WD", ["Adaptive Dynamics", "Meridian Sound", "ClearSight Camera", "Dynamic Response Pro"], "/vehicles/range-rover-sport.jpg"),
  v(11, "Porsche", "Cayenne Turbo GT", "SUV", "There Is No Substitute", "GERMAN PRECISION", 2024, 110000000, "4.0L V8 Twin-Turbo", "631 HP", "0-100 in 3.3s", "Petrol", "Automatic", "AWD", ["Sport Chrono Package", "PASM Chassis", "Ceramic Brakes", "Race-Tex Interior"], "/vehicles/porsche-cayenne.jpg"),
  v(12, "Porsche", "911 GT3", "Sports Car", "Timeless. Pure. Purpose.", "RACEBORN", 2024, 105000000, "4.0L Flat-6", "502 HP", "0-100 in 3.4s", "Petrol", "Automatic", "RWD", ["GT3 Aero Package", "PCCB Ceramic Brakes", "Sport Seats Plus", "RS Spyder Wheels"], "/vehicles/porsche-911.jpg"),
  v(13, "Porsche", "Panamera Turbo", "Sedan", "The Executive Sports Car", "FOUR-DOOR THRILL", 2023, 98000000, "4.0L V8 Twin-Turbo", "630 HP", "0-100 in 3.1s", "Petrol", "Automatic", "AWD", ["Sport Chrono Package", "Porsche Dynamic Chassis", "Burmester Audio", "Rear Executive Seats"], "/vehicles/panamera.jpg"),
  v(14, "Porsche", "Macan GTS", "SUV", "Athletic by Nature", "SPORTY CROSSOVER", 2023, 48000000, "2.9L V6 Twin-Turbo", "434 HP", "0-100 in 4.2s", "Petrol", "Automatic", "AWD", ["Sport Chrono Package", "PASM Sport Suspension", "Sports Exhaust", "GTS Sports Seats"], "/vehicles/macan.jpg"),
  v(15, "Lamborghini", "Urus", "SUV", "Expect the Unexpected", "ITALIAN EXCELLENCE", 2024, 180000000, "4.0L V8 Twin-Turbo", "657 HP", "0-100 in 3.3s", "Petrol", "Automatic", "AWD", ["ANIMA Driving Modes", "Carbon Ceramic Brakes", "Bang & Olufsen Audio", "Lamborghini Telemetry"], "/vehicles/lamborghini-urus.jpg"),
  v(16, "Lamborghini", "Huracan Evo", "Sports Car", "Born to Compete", "RAWLING BULL", 2023, 225000000, "5.2L V10", "631 HP", "0-100 in 2.9s", "Petrol", "Automatic", "AWD", ["LDVI System", "Magnetorheological Suspension", "Dynamic Steering", "Carbon Ceramic Brakes"], "/vehicles/huracan.jpg"),
  v(17, "Audi", "RS6 Avant", "Sports Car", "Vorsprung durch Technik", "MODERN INNOVATION", 2024, 88000000, "4.0L V8 Twin-Turbo", "591 HP", "0-100 in 3.5s", "Petrol", "Automatic", "AWD", ["Quattro AWD", "RS Adaptive Suspension", "Virtual Cockpit Plus", "Dynamic Ride Control"], "/vehicles/audi-rs6.jpg"),
  v(18, "Audi", "R8 V10 Performance", "Sports Car", "The High-Performance Experience", "NATURALLY ASPIRATED", 2022, 210000000, "5.2L V10", "602 HP", "0-100 in 3.1s", "Petrol", "Automatic", "AWD", ["Quattro AWD", "Carbon Ceramic Brakes", "Magnetic Ride", "Laser Headlights"], "/vehicles/audi-r8.jpg"),
  v(19, "Bentley", "Continental GT", "Coupe", "Driven by Perfection", "GRAND TOURING", 2024, 120000000, "6.0L W12 Twin-Turbo", "650 HP", "0-100 in 3.6s", "Petrol", "Automatic", "AWD", ["Rotating Display", "Naim Audio", "Mulliner Driving Spec", "Diamond Knurling"], "/vehicle.png"),
  v(20, "Bentley", "Bentayga", "SUV", "Handcrafted in Crewe", "MOTORING GRANDEUR", 2023, 115000000, "6.0L W12 Twin-Turbo", "626 HP", "0-100 in 3.9s", "Petrol", "Automatic", "AWD", ["Air Suspension", "Naim Audio", "Executive Rear Seats", "All-Terrain Modes"], "/vehicles/bentayga.jpg"),
  v(21, "Lexus", "LM", "MPV", "Experience Amazing", "THE ROYAL LOUNGE", 2024, 65000000, "2.4L Turbo Hybrid", "371 HP", "0-100 in 6.2s", "Hybrid", "Automatic", "FWD", ["Ottoman Seats", "14\" Rear Display", "Climate Concierge", "Mark Levinson Audio"], "/vehiclehero.png"),
  v(22, "Lexus", "LC500", "Coupe", "The Art of the Drive", "JAPANESE ARTISTRY", 2023, 58000000, "5.0L V8", "471 HP", "0-100 in 4.4s", "Petrol", "Automatic", "RWD", ["Torsen LSD", "Variable Gear Steering", "Mark Levinson Audio", "Active Rear Spoiler"], "/vehicles/lc500.jpg"),
  v(23, "Ford", "Mustang GT", "Coupe", "Built for the Thrill", "AMERICAN MUSCLE", 2024, 58000000, "5.0L V8", "480 HP", "0-100 in 4.1s", "Petrol", "Automatic", "RWD", ["Active Exhaust", "Launch Control", "Track Apps", "MagneRide Dampers"], "/vehicles/ford-mustang.jpg"),
  v(24, "Chevrolet", "Corvette C8", "Sports Car", "The American Supercar", "MID-ENGINE LEGEND", 2023, 75000000, "6.2L V8 LT2", "495 HP", "0-100 in 2.9s", "Petrol", "Automatic", "RWD", ["Magnetic Ride Control", "Limited Slip Differential", "Front Lift System", "Performance Exhaust"], "/vehicles/corvette.jpg"),
  v(25, "Ferrari", "488 GTB", "Sports Car", "Forza Ferrari", "PRANCING HORSE", 2023, 235000000, "3.9L V8 Twin-Turbo", "661 HP", "0-100 in 2.9s", "Petrol", "Automatic", "RWD", ["Side Slip Control", "E-Diff", "Carbon Ceramic Brakes", "Launch Control"], "/vehicles/ferrari.jpg"),
  v(26, "Chevrolet", "Camaro SS", "Coupe", "The Muscle Icon", "RAW AGGRESSION", 2023, 45000000, "6.2L V8", "455 HP", "0-100 in 4.0s", "Petrol", "Automatic", "RWD", ["Magnetic Ride Control", "Performance Exhaust", "Launch Control", "Recaro Seats"], "/vehicles/camaro.jpg"),
  v(27, "BMW", "750Li xDrive", "Sedan", "The Pinnacle of Luxury", "FLAGSHIP COMPOSER", 2023, 88000000, "4.4L V8 Twin-Turbo", "523 HP", "0-100 in 4.1s", "Petrol", "Automatic", "AWD", ["Executive Lounge", "Sky Lounge Roof", "Bowers & Wilkins Audio", "Rear Tablet Controls"], "/vehicles/bmw-7.jpg"),
  v(28, "Mercedes-Benz", "E350", "Sedan", "The Business Class", "REFINED AMBITION", 2023, 38000000, "3.0L Inline-6 Turbo", "362 HP", "0-100 in 5.3s", "Petrol", "Automatic", "RWD", ["MBUX Navigation", "Burmester Sound", "DIGITAL LIGHT", "Piano Lacquer Trim"], "/vehicles/mercedes-e.jpg"),
];

export const vehicleBrands = Array.from(new Set(vehicles.map((x) => x.brand))).sort();
export const vehicleCategories = ["All", ...Array.from(new Set(vehicles.map((x) => x.category)))];
export const vehicleFuels = Array.from(new Set(vehicles.map((x) => x.fuel))).sort();
export const vehicleTransmissions = Array.from(new Set(vehicles.map((x) => x.transmission))).sort();
export const vehicleDrives = Array.from(new Set(vehicles.map((x) => x.drive))).sort();
export const vehicleYears = Array.from(new Set(vehicles.map((x) => x.year))).sort((a, b) => b - a);