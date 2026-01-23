<script lang="ts">
  import { siteLink } from "$lib/constants";
  import { quintOut } from "svelte/easing";
  import { fade } from "svelte/transition";
  let lang = $state("en");

  const fadeIn = {
    delay: 200,
    duration: 200,
    easing: quintOut,
  };
  const fadeOut = {
    duration: 200,
    easing: quintOut,
  };
</script>

<div class="flex space-x-4 mb-4">
  <button
    type="button"
    onclick={() => {
      lang = "en";
    }}><img src="/img/en.png" alt="EN" /></button
  >
  <button
    type="button"
    onclick={() => {
      lang = "de";
    }}><img src="/img/de.png" alt="DE" /></button
  >
  <button
    type="button"
    onclick={() => {
      lang = "fr";
    }}><img src="/img/fr.png" alt="FR" /></button
  >
</div>

{#if lang === "en"}
  <div in:fade={fadeIn} out:fade={fadeOut}>
    <h1>Musec</h1>
    <p>Do you know a song by just listening to one second of it?</p>
    <p><img src="/img/musec.png" alt="Musec" /></p>
    <p>
      Choose folders and files from your own music library and see if you can guess title, artist
      and album by only hearing less than five seconds from somewhere in the song. Right answers
      will add points to your score.<br />
      Musec is open source software and using the Qt5 framework. It is available in English, German and
      French.
    </p>
    <h2>
      <a href="{siteLink}/musec/score" target="_blank" rel="external noopener">View Scoreboard</a>
    </h2>
    <h3>Download</h3>
    <p>
      <b>Version 1.1.2 (2014-02-06)</b><br />
      <a href="https://github.com/Mystler/Musec/releases/download/v1.1.2/Musec.exe"
        >Windows (Installer)</a
      ><br />
      <a href="https://github.com/Mystler/Musec" target="_blank" rel="noopener">Source</a>
    </p>
    <h3>FAQ</h3>
    <p><b>1. How do I use Musec?</b></p>

    <p>
      The user interface should be quite intuitive. To start playing, add media via the "Music" menu
      in the top bar.
    </p>

    <p><b>2. What music can I import with Musec?</b></p>
    <p>
      You can import folders, M3U playlists and individual files. The supported file formats are MP3
      and M4A.<br />
      Personally, I like to export my favorite iTunes playlist to M3U and import it in Musec.
    </p>
    <p><b>3. Why does Musec not play all of my songs?</b></p>
    <p>
      Musec will skip songs if they are invalid (not readable by the player), shorter than 30
      seconds or do not have the necessary tags (title, artist and album).
    </p>
  </div>
{:else if lang === "de"}
  <div in:fade={fadeIn} out:fade={fadeOut}>
    <h1>Musec</h1>
    <p>Erkennst du ein Lied, wenn du nur eine Sekunde davon hörst?</p>
    <p><img src="/img/musec.png" alt="Musec" /></p>
    <p>
      Wähle Ordner und Dateien deiner eigenen Musik-Bibliothek und schau, ob du Titel, Künstler und
      Album erraten kannst, wenn du einen weniger als fünf Sekunden langen Ausschnitt aus dem Lied
      hörst. Richtige Antworten erhöhen deine Punktzahl.<br />
      Musec ist Open Source Software und nutzt die Qt5 Bibliothek. Es ist verfügbar in Englisch, Deutsch
      und Französisch.
    </p>
    <h2>
      <a href="{siteLink}/musec/score" target="_blank" rel="external noopener"
        >Punktetafel ansehen</a
      >
    </h2>
    <h3>Download</h3>
    <p>
      <b>Version 1.1.2 (06.02.2014)</b><br />
      <a href="https://github.com/Mystler/Musec/releases/download/v1.1.2/Musec.exe"
        >Windows (Installer)</a
      ><br />
      <a href="https://github.com/Mystler/Musec" target="_blank" rel="noopener">Quellcode</a>
    </p>
    <h3>FAQ</h3>
    <p><b>1. Wie benutze ich Musec?</b></p>
    <p>
      Die Nutzeroberfläche sollte ziemlich intuitiv sein. Um zu spielen, füge Musik über das
      "Musik"-Menü in der oberen Leiste hinzu.
    </p>
    <p><b>2. Welche Musik kann ich mit Musec importieren?</b></p>
    <p>
      Du kannst Ordner, M3U-Playlists und einzelne Dateien importieren. Die unterstützten
      Datei-Formate sind MP3 und M4A.<br />
      Ich selbst exportiere gern meine Lieblings-Playlist aus iTunes nach M3U und importiere sie in Musec.
    </p>
    <p><b>3. Warum spielt Musec nicht alle meine Lieder?</b></p>
    <p>
      Musec überspringt Lieder wenn sie ungültig sind (vom Player nicht lesbar), kürzer als 30
      Sekunden oder nicht die nötigen Tags (Titel, Künstler, Album) haben.
    </p>
  </div>
{:else if lang === "fr"}
  <div in:fade={fadeIn} out:fade={fadeOut}>
    <h1>Musec</h1>
    <p>Pouvez-vous reconnaître une chanson juste en en écoutant une seconde?</p>
    <p><img src="/img/musec.png" alt="Musec" /></p>
    <p>
      <i>(Traduction par Lyrositor)</i><br />
      Choisissez des dossiers et des fichiers de votre propre bibliothèque musicale et voyez si vous pouvez
      devinez le titre, l’artiste et l’album en écoutant seulement moins de 5 secondes d’une portion de
      la chanson. Des réponses correctes ajouteront des points à votre score.<br />
      Musec est un logiciel open source utilisant Qt5. Il est disponible en Anglais, en Allemand et en
      Français.
    </p>
    <h2>
      <a href="{siteLink}/musec/score" target="_blank" rel="external noopener">Voir Scoreboard</a>
    </h2>
    <h3>Download</h3>
    <p>
      <b>Version 1.1.2 (06.02.2014)</b><br />
      <a href="https://github.com/Mystler/Musec/releases/download/v1.1.2/Musec.exe"
        >Windows (Installer)</a
      ><br />
      <a href="https://github.com/Mystler/Musec" target="_blank" rel="noopener">Source</a>
    </p>
    <h3>FAQ</h3>
    <p><b>1. Comment fonctionne Musec?</b></p>
    <p>
      L’interface utilisateur devrait être assez intuitive. Pour commencer à jouer, ajoutez de la
      musique grâce au menu “Musique” de la barre en haut.
    </p>
    <p><b>2. Quelle musique puis-je importer avec Musec?</b></p>
    <p>
      Vous pouvez importer des dossiers, des listes de lecture m3u et des fichiers individuels. Les
      formats de fichiers utilisables sont mp3 et m4a.<br />
      Personellement, je préfère exporter ma liste de lecture iTunes préférée au format m3u pour ensuite
      l’importer dans Musec.
    </p>
    <p><b>3. Pourquoi est-ce que Musec ne lit pas toutes mes chansons?</b></p>
    <p>
      Musec va sauter des chansons si elles ne sont pas interprétables par le lecteur, plus courtes
      que 30 secondes ou si elles n’ont pas les balises nécessaires (titre, artiste et album).
    </p>
  </div>
{/if}
