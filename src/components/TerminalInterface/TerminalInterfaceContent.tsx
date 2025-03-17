import React, { useEffect, useRef, useState } from 'react';
import { calculateTimeLeft } from '@/utils/timeUtils';
import { useAppDispatch } from '@/app/hooks.ts';
import { closeApplication } from '@/app/ApplicationsSlice.ts';

interface TerminalInterfaceContentProps {
  windowTitle?: string;
  isFocused?: boolean;
}

const TerminalInterfaceContent: React.FC<TerminalInterfaceContentProps> = ({
  windowTitle = '',
  isFocused = false,
}) => {
  const [lines, setLines] = useState<string[]>([]);
  const [currentInput, setCurrentInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [, setHistoryIndex] = useState<number | null>(null);
  const lastLineRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const targetDate = import.meta.env.VITE_MIDI_DATE;
  const dispatch = useAppDispatch();

  const printingCommand = (s: string) => '  ' + s;
  const printingCommands = (arr: string[]): string[] =>
    arr.map(s => printingCommand(s));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (e.key === 'Enter') {
      const handleCommand = (): string[] | undefined => {
        switch (currentInput.trim().toLowerCase()) {
          case '?': {
            return printingCommands([
              'Galimos komandos:',
              "1. 'komanda'",
              "2. 'renginiai'",
              '3. <renginio pavadinimas>',
              "4. 'laikas'",
              "5. 'iseiti'",
            ]);
          }
          case 'komanda': {
            return printingCommands([
              'MIDI komanda:',
              '- Ugnė Vaičiūnaitė:        MIDI 2025 vadovė                                  vadovas@midi.lt',
              '- Kasparas Šumskis:        Žmogiškųjų išteklių vadovas                       hr@midi.lt',
              '- Austėja Bendikaitė:      Komunikacijos vadovė                              info@midi.lt',
              '- Deimantė Balčiūtė:       Administratorė                                    admin@midi.lt',
              '- Saule Gylyte:            Marketingo ir įmonių mugės vadovė                 marketingas@midi.lt',
              '- Rokas Baltrušaitis:      Organizacinės srities vadovas                     org@midi.lt',
              '- Emilija Abromaitytė:     Organizacinės srities vadovė                      dienine@midi.lt',
              '- Danielius Gurvič:        Organizacinės srities vadovas                     vakarine@midi.lt',
              '- Astrida Jablonskytė:     Barterių rėmėjų vadovė                            reklama@midi.lt',
              '- Domas Klimavičius:       IT srities vadovas                                it@midi.lt',
              '- Gytis Mockevičius:       LAN Party vadovas                                 lan@midi.lt',
              '- Gabrielė Drungilaitė:    MIDI Roko Operos vadovė                           ro.vadovas@midi.lt',
              '- Nika Bukolovaitė:        Uždarymo vakaro vadovė                            uzdarymas@midi.lt',
              '- Tadas Baltrūnas:         Bėgimo vadovas                                    sportas@midi.lt',
              '- Matas Bruson:            Krepšinio turnyro vadovas                         sportas@midi.lt',
              '- Šarūnas Gikys:           Mažųjų turnyrų vadovas                            lan.turnyrai@midi.lt',
              '- Monika Tamelytė:         Protmūšio vadovė                                  protmusis@midi.lt',
              '- Eglė Gurklytė:           Minecraft vadovė                                  minecraft@midi.lt',
              '- Mindaugas Tolušis:       Discord vadovas                                   discord@midi.lt',
              '- Gintaras Ubavičius:      Sportinio pokerio turnyro vadovas                 pokeris@midi.lt',
              '- Jokūbas Jurgaitis:       Šachmatų turnyro vadovas                          sachmatai@midi.lt',
              '- Augustė Ostrauskaitė:    PR vadovė                                         pr@midi.lt',
              '- Gabija Kondrataitė:      Dizaino srities vadovė                            dizainas@midi.lt',
              '- Jūris Galvosas:          Video vadovas                                     video@midi.lt',
              '- Haroldas Trinkūnas:      Dizaino srities vadovas                           dizainas@midi.lt',
              '- Urtė Gedvilaitė:         Press vadovė                                      press@midi.lt',
              '- Artūras Semenčiuk:       Pagrindinių turnyrų vadovas                       lan.turnyrai@midi.lt',
              '- Augustas Kniška:         Stream vadovas                                    stream@midi.lt',
              '- Justas Aleknavičius:     Tinklinio ir futbolo turnyrų, foto vadovas        sportas@midi.lt ir foto@midi.lt',
              '- Ričardas Čubukinas:      LAN party mentorius                               lan@midi.lt',
              '- Lukas Jakonis:           Komunikacijos mentorius                           info@midi.lt',
              '- Gabija Burokaitė:        Marketingo mentorė                                marketingas@midi.lt',
            ]);
          }
          case 'veiklos':
          case 'renginiai': {
            return printingCommands([
              'MIDI renginiai:',
              '- Sportinis pokeris:       2025-04-10',
              '- LAN Party:               2025-04-12 ir 2025-04-13',
              '- Šachmatai:               2025-04-12',
              '- Asseco Sporto dienos:    2025-04-13 ir 2025-04-15',
              '- Įmonių mugė:             2025-04-14',
              '- Roko opera:              2025-04-16',
              '- Protmūšis:               2025-04-17',
              '- Uždarymo vakaras:        2025-04-18',
            ]);
          }
          case 'sportinis pokeris':
          case 'pokeris':
          case 'sportinis': {
            return printingCommands([
              '2025-04-10',
              'Ar tiki, kad sėkmė nėra vienintelis pokerio elementas? MIDI 2025 Sportinio pokerio turnyras laukia būtent tavęs!',
              'Šiame turnyre svarbiausia ne tik kortų kombinacijos, bet ir strateginis mąstymas, žaidėjo psichologija bei gebėjimas skaityti oponentus.',
              'Nesvarbu, ar esi patyręs žaidėjas, ar tiesiog nori išbandyti savo jėgas – šiame turnyre laukia įdomūs iššūkiai ir puikios emocijos!',
              'Daugiau informacijos apie registraciją ir prizus – netrukus.',
            ]);
          }
          case 'lan party':
          case 'lan': {
            return printingCommands([
              '2025-04-12 ir 2025-04-13',
              'Esi tikras žaidimų entuziastas ir nori pasinerti į virtualių pasaulių kovas? MIDI LAN Party – tai renginys, kuriame laukia daugybė emocijų ir konkurencingos dvasios!',
              'Čia galėsi išbandyti savo jėgas populiariausiuose komandiniuose ir individualiuose žaidimuose bei susirungti su kitais žaidėjais, kurie taip pat trokšta pergalių.',
              'Nesvarbu, ar esi FPS fanas, strategijų genijus ar MOBA entuziastas – šiame renginyje rasi savo vietą!',
              'Atsinešk savo įrangą, pasiruošk draugiškai konkurencijai ir nepamiršk pasimėgauti vakaro atmosfera – MIDI LAN Party laukia tavęs!',
              'Daugiau informacijos jau netrukus.',
            ]);
          }
          case 'šachmatai':
          case 'sachmatai': {
            return [
              '2025-04-12',
              'Ar esi iš tų, kurie mano, kad 64 langelių ribos, užtenka įrodyti savo meistriškumą? Ar tau pažįstami žirgo posūkiai ir protingi karalienės manevrai?',
              'Tuomet šis MIDI renginys kaip tik tau! MIDI Šachmatų turnyras – tai tradicija, sujungianti šachmatų mėgėjus ir profesionalus jau daugelį metų.',
              'Tavęs laukia ne tik įtemptos partijos, bet ir šiltos emocijos, nauji pažįstami bei šaunūs prizai! Laukiami ir grandmeistrai, ir pradedantieji.',
              'Daugiau informacijos jau netrukus.',
            ];
          }
          case 'asseco sporto dienos':
          case 'asseco':
          case 'asseco sporto':
          case 'asseco sportas':
          case 'asseco dienos':
          case 'sporto dienos':
          case 'sporto':
          case 'sportas': {
            return [
              '2025-04-13 ir 2025-04-15',
              'Ar pasiruošęs pasinerti į sportišką nuotykį ir pajusti komandinės dvasios jėgą?',
              'MIDI Asseco Sporto dienos – tai metas, kai visi pamiršta savo užrašus bei kompiuterius, ir susitinka aikštelėje dėl smagaus laiko ir sveikos konkurencijos!',
              'Šio renginio metu tavęs laukia įvairių sporto šakų turnyrai. Nesvarbu, ar esi atletiškas profesionalas, ar tiesiog mėgėjas, šios dienos skirtos visiems!',
              'Pradėk rinkti komandą ir kartu įrodykite, kad sportas – tai ne tik varžybos, bet ir puiki proga užmegzti naujus ryšius bei tiesiog gerai praleisti laiką!',
              'Daugiau informacijos jau netrukus.',
            ];
          }
          case 'imones':
          case 'įmonės':
          case 'įmones':
          case 'imonės':
          case 'įmonių mugė':
          case 'įmonių muge':
          case 'įmoniu mugė':
          case 'įmoniu muge':
          case 'imonių mugė':
          case 'imonių muge':
          case 'imoniu mugė':
          case 'imoniu muge': {
            return [
              '2025-04-14',
              'Atraskite savo karjeros galimybes MIDI 2025 Įmonių mugėje!',
              'Ieškote praktikos, pirmojo darbo ar tiesiog smalsaujate apie galimas karjeros kryptis?',
              'Kasmetinė MIDI Įmonių mugė – tai puiki proga susipažinti su inovatyviomis įmonėmis, atrasti galimybes ir užmegzti ryšius su savo sričių profesionalais.',
              'Mugėje turėsite galimybę:',
              ' • Sužinoti daugiau apie įvairias įmones ir jų siūlomas pozicijas.',
              ' • Tiesiogiai užduoti klausimus įmonių atstovams.',
              ' • Dalyvauti greituosiuose darbo pokalbiuose, įgyti realios interviu patirties ir galbūt iš karto užsitikrinti sau darbo poziciją.',
              'Nepraleiskite progos pradėti savo karjeros ar atrasti sau tobulą praktiką! Pasiruoškite klausimus, savo CV ir gerą nuotaiką – pasimatysime ten!',
              'Daugiau informacijos jau netrukus.',
            ];
          }
          case 'roko opera':
          case 'rokopera':
          case 'rokas':
          case 'opera': {
            return [
              '2025-04-16',
              'Ar kada nors pagalvojai, kas nutinka, kai jaudinantis teatras susitinka su audringa muzika?',
              'MIDI 2025 Roko opera – tai unikalus renginys, kuriame pasakojama istorija per užburiančią muziką ir įspūdingus pasirodymus!',
              'Ši roko opera sukurta specialiai MIDI savaitei, įtraukiant geriausius talentus – nuo muzikantų ir dainininkų iki režisierių ir scenografų.',
              'Spektaklio siužetas – kupinas emocijų, netikėtų posūkių ir gilios simbolikos, kurią papildys energingos gitaros ir aistringi vokalai.',
              'Nepraleisk progos pamatyti šį ypatingą pasirodymą, kuris sujungs muziką, teatrą ir technologijas į vieną įsimintiną vakarą!',
              'MIDI Roko opera taps tikra MIDI savaitės pažiba ir parodys, kad matematika ir informatika gali būti tokia pat įkvepianti kaip ir menas.',
              'Daugiau informacijos apie bilietus ir pasirodymo laiką – netrukus!',
            ];
          }
          case 'protmūšis':
          case 'protmušis':
          case 'protmusis':
          case 'protmūsis': {
            return [
              '2025-04-17',
              'Ar tavo galvoje daugiau atsakymų nei klausimų? Ar mėgsti išnarplioti painiausias mįsles ir būti tuo, kuris suranda raktą į teisingą atsakymą?',
              'Protmūšis – renginys tiems, kurie mėgsta iššūkius ir tiki savo komandos jėga!',
              'MIDI Protmūšis – tai ne tik galimybė pademonstruoti savo žinias, bet ir įdomiai praleisti laiką, pasisemti gerų emocijų bei laimėti šaunius prizus!',
              'Nesvarbu, ar esi faktų enciklopedija, ar mėgsti loginius galvosūkius, kartu su savo draugais galite tapti šio renginio žvaigždėmis.',
              'Surink savo draugus (komanda turi būti iki 6 žmonių) intelektinei kovai 2025 MIDI protmūšyje! Svarbu pabrėžti, kad renginys vyks TIK lietuvių kalba!',
              'Daugiau informacijos jau netrukus.',
            ];
          }
          case 'uždarymo vakaras':
          case 'uzdarymo vakaras':
          case 'uzdarymas':
          case 'vakaras':
          case 'party':
          case 'tūsas':
          case 'tusas': {
            return [
              '2025-04-18',
              'Ar girdi tu, ar matai? Švenčia MIF’o katinai!',
              'MIDI 2025 Uždarymo vakaras – tai ne tik ikoniško renginių ciklo pabaiga, bet ir šventė, kuri primena visiems, kad Matematikai ir Informatikai moka linksmintis, kaip niekas kitas!',
              'Šiame vakarėlyje laukia ne tik muzika ir šokiai, bet ir puiki proga atsipalaiduoti po intensyvios savaitės, pabendrauti su draugais bei kolegomis ir pasidžiaugti kartu. Renginys toli gražu nėra uždaras, tad čiupk už parankės ir atsivesk draugus (taip, net jei tai fizikai…)',
              'Ateik švęsti, dalintis geromis emocijomis ir užbaigti MIDI 2025 su trenksmu!',
              'Daugiau informacijos jau netrukus.',
            ];
          }
          case 'laikas': {
            const timeLeft = calculateTimeLeft(targetDate);
            return printingCommands([
              `Laikas iki MIDI: ${timeLeft.days} dien, ${timeLeft.hours} val, ${timeLeft.minutes} min, ${timeLeft.seconds} sek`,
            ]);
          }
          case 'iseiti':
          case 'išeiti':
          case 'uzdaryti':
          case 'uždaryti':
          case 'exit':
            dispatch(closeApplication('Terminalas'));
            break;
          default:
            return printingCommands([
              "Tokios komandos nėra, jei reikia galimų komandų sąrašo, irašyk '?'",
            ]);
        }
      };

      const command = handleCommand();
      if (!command) return;

      setLines(prevLines => [...prevLines, `>>> ${currentInput}`, ...command]);
      setCommandHistory(prevHistory => [...prevHistory, currentInput]);
      setCurrentInput('');
      setHistoryIndex(null);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        setHistoryIndex(prevIndex => {
          const newIndex =
            prevIndex === null
              ? commandHistory.length - 1
              : Math.max(prevIndex - 1, 0);
          setCurrentInput(commandHistory[newIndex] || '');
          return newIndex;
        });
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        setHistoryIndex(prevIndex => {
          const newIndex =
            prevIndex === null
              ? null
              : Math.min(prevIndex + 1, commandHistory.length);
          setCurrentInput(
            newIndex === null || newIndex === commandHistory.length
              ? ''
              : commandHistory[newIndex],
          );
          return newIndex;
        });
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
    } else if (e.key.length === 1 && currentInput.length < 100) {
      setCurrentInput(prevInput => prevInput + e.key);
    } else if (e.key === 'Backspace') {
      setCurrentInput(prevInput => prevInput.slice(0, -1));
    }
  };

  useEffect(() => {
    if (lastLineRef.current) {
      lastLineRef.current.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  }, [lines, currentInput]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (isFocused && terminalRef.current) {
      terminalRef.current.focus();
    }
  }, [isFocused]);

  return (
    <div className="space-y-2 flex flex-col overflow-hidden">
      <div className="flex items-center justify-center flex-shrink-0 h-[25%] overflow-hidden">
        <pre className="text-center text-midi-blue whitespace-pre leading-none">
          {`
____    ____ _____ ______   _____ 
|_   \\  /   _|_   _|_   _ \`.|_   _|
  |   \\/   |   | |   | | \`. \\ | |  
  | |\\  /| |   | |   | |  | | | |  
 _| |_\\/_| |_ _| |_ _| |_.' /_| |_ 
|_____||_____|_____|______.'|_____|`}
        </pre>
      </div>
      <br />
      <div className="w-full text-center flex-shrink-0">
        <div className="text-xs text-gray-600 leading-none">
          {'='.repeat(200)}
        </div>
      </div>
      <div
        ref={terminalRef}
        id={`terminal-input-${windowTitle}`}
        className="flex-1 overflow-y-auto focus:outline-none px-4"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="whitespace-pre-wrap text-lg text-midi-blue break-words">
          {
            'Sveiki prisijungę! Šiame terminale galite sužinoti apie MIDI 2025 rėmėjus, komandą, renginius ir kt.\n'
          }
          {'Galimos komandos:\n'}
          {/*{"  'rėmėjai'\n"}*/}
          {"'komanda'\n"}
          {"'renginiai'\n"}
          {'<renginio pavadinimas>\n'}
          {"'laikas'\n"}
          {"'iseiti'\n"}
          {lines.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
          <div ref={lastLineRef}>
            {`>>>`} {currentInput}
            <span className="animate-pulse">|</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalInterfaceContent;
