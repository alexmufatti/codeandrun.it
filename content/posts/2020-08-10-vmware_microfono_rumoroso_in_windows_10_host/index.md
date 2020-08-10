---
title: "VMware: Microfono rumoroso in Windows 10 host"
keywords: 
- vmware audio
- microphone noise
images: ["mic.jpg"]
tags:
- Linux
- Windows
- vmware
- audio
date: 2020-08-10 10:00:00
---

{{< figure src="mic.jpg" link="mic.jpg" >}}

Utilizzando Linux come sistema operativo di base a volte capita di dover avviare delle macchine virtuali Windows per eseguire quei programmi che su linux non esistono o hanno funzionalità limitate.
Esempi tipici sono *Skype for Business* che non esiste in linux o *Teams* che non ha tutte le funzionalità della versione nativa.

Purtroppo però l'audio del microfono all'interno della VM a volte risulta estremamente disturbato, tanto da essere inutilizzabile.

Dopo un po' di prove e molte ricerche ho trovato un modo, assolutamente contro-intuitivo, per sistemare questo problema.

Per prima cosa installate i VmWareTools se non lo avete ancora fatto e assicuratevi che nella macchina virtuale sia configurata una scheda audio in modalità `auto detect`.

{{< figure src="setup.jpg" link="setup.jpg" >}}

A questo punto spegnete la macchina virtuale ed editate il corrispettivo file `.vmx`.

Cercate la riga contenente `sound.virtualDev = "hdaudio"` e rimuovetela. Sì, questo è il passaggio contro-intuitivo: rimuovendo quella riga si eviterà che VmWare simuli una scheda audio virtuale e utilizzi invece quella presente sulla vostra macchina.

Al riavvio della macchina virtuale noterete che non viene rilevato nessun hardware per la riproduzione audio. 
Ora montate il cd dei vmware tools come se voleste reinstallarli (potete anche usare la voce del menu di vmware) ma non fatelo. Aprite un _prompt_ e andate sul device che contiene l'installer. Da qui lanciate il comando `setup64.exe /a`. L'opzione `a` fará in modo che i vmware tools, al posto di essere installati, siano solo scompattati una cartella di vostra scelta. Scegliete una cartella e continuate.

Ora aprite il `Device Manager`; troverete una periferica multimediale non riconosciuta. Scegliete di aggiornare il driver e, invece di farlo cercare automaticamente dal sistema operativo, scegliete di indicare voi dove trovarlo. 

{{< figure src="browse.jpg" link="browse.jpg" >}}

Come percorso scegliete quello dove avete scompattato i vmware Tools e poi navigate nelle sotto cartelle `vmware/drivers/audio/vista`.

{{< figure src="folders.jpg" link="folders.jpg" >}}

Verrà quindi installato il driver corretto e da quel momento non dovreste avere più problemi di disturbi nell'uso del microfono all'interno di Windows 10 in vmware!

{{< figure src="done.jpg" link="done.jpg" >}}
