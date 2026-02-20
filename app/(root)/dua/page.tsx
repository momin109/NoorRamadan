import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Quote } from "lucide-react";

export default function Dua() {
  const duas = [
    {
      title: "Sehri Dua",
      arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      banglaArabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      bangla: "আমি রমজান মাসে আগামীকালের রোজা রাখার নিয়ত করলাম।",
      type: "sehri",
    },
    {
      title: "Iftar Dua",
      arabic:
        "اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ",
      banglaArabic:
        "আল্লাহুম্মা ইন্নী লাকা সুমতু ওয়া বিকা আমান্তু ওয়া ‘আলা রিযক্বিকা আফতারতু",
      bangla:
        "হে আল্লাহ! আমি তোমার জন্য রোজা রেখেছি, তোমার ওপর ঈমান এনেছি এবং তোমার দেওয়া রিজিক দ্বারা ইফতার করছি।",
      type: "iftar",
    },
  ];

  const hadiths = [
    {
      source: "Sahih Al-Bukhari",
      arabic:
        "إِذَا جَاءَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ وَغُلِّقَتْ أَبْوَابُ النَّارِ وَصُفِّدَتِ الشَّيَاطِينُ",
      bangla:
        "রমজান মাস আসলে জান্নাতের দরজাগুলো খুলে দেওয়া হয়, জাহান্নামের দরজাগুলো বন্ধ করে দেওয়া হয় এবং শয়তানদের শিকলবন্দী করা হয়।",
    },
    {
      source: "Sahih Muslim",
      arabic:
        "مَنْ صَامَ رَمَضَانَ إِيمَانًا وَاحْتِسَابًا غُفِرَ لَهُ مَا تَقَدَّمَ مِنْ ذَنْبِهِ",
      bangla:
        "যে ব্যক্তি ঈমান ও সওয়াবের আশায় রমজান মাসে রোজা রাখে, তার পূর্বের গুনাহসমূহ মাফ করে দেওয়া হয়।",
    },
    {
      source: "Tirmidhi",
      arabic:
        "ثَلَاثَةٌ لَا تُرَدُّ دَعْوَتُهُمْ: الصَّائِمُ حِينَ يُفْطِرُ، وَالإِمَامُ الْعَادِلُ، وَدَعْوَةُ الْمَظْلُومِ",
      bangla:
        "তিন ব্যক্তির দোয়া প্রত্যাখ্যান করা হয় না: ইফতারের সময় রোজাদারের দোয়া, ন্যায়পরায়ণ শাসকের দোয়া এবং মজলুমের দোয়া।",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-heading font-bold text-primary mb-4">
              দোয়া ও দৈনিক হাদিস
            </h1>
            <p className="text-muted-foreground">
              পবিত্র রমজান মাসে আপনার আত্মার জন্য আধ্যাত্মিক পুষ্টি।
            </p>
          </div>

          <Tabs defaultValue="duas" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="duas">দৈনিক দোয়া</TabsTrigger>
              <TabsTrigger value="hadith">হাদিস সংগ্রহ</TabsTrigger>
            </TabsList>

            <TabsContent value="duas" className="space-y-6">
              {duas.map((dua, i) => (
                <Card key={i} className="overflow-hidden border-primary/20">
                  <div
                    className={`h-2 w-full ${
                      dua.type === "sehri" ? "bg-primary" : "bg-secondary"
                    }`}
                  />
                  <CardHeader>
                    <CardTitle className="text-center text-xl text-primary">
                      {dua.title === "Sehri Dua"
                        ? "সেহরির দোয়া"
                        : "ইফতারের দোয়া"}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="text-center space-y-6">
                    {/* Arabic */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        আরবি
                      </p>
                      <p className="text-3xl font-heading leading-loose text-foreground dir-rtl font-bold py-2">
                        {dua.arabic}
                      </p>
                    </div>

                    {/* Bangla Pronunciation */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        উচ্চারণ
                      </p>
                      <p className="text-lg italic">{dua.banglaArabic}</p>
                    </div>

                    {/* Bangla Meaning */}
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
                        অর্থ
                      </p>
                      <p className="text-lg">{dua.bangla}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="hadith">
              <Card>
                <CardContent className="p-6">
                  <ScrollArea className="h-[500px] pr-4">
                    <div className="space-y-6">
                      {hadiths.map((hadith, i) => (
                        <div
                          key={i}
                          className="bg-muted/30 p-6 rounded-lg relative space-y-4"
                        >
                          <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/10 rotate-180" />

                          {/* Arabic Hadith */}
                          <div className="relative z-10 pl-8">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                              আরবি
                            </p>
                            <p className="text-xl leading-relaxed dir-rtl font-bold">
                              {hadith.arabic}
                            </p>
                          </div>

                          {/* Bangla */}
                          <div className="relative z-10 pl-8">
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">
                              বাংলা অর্থ
                            </p>
                            <p className="text-lg leading-relaxed">
                              {hadith.bangla}
                            </p>
                          </div>

                          <p className="text-right text-sm font-bold text-primary">
                            — {hadith.source}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}
