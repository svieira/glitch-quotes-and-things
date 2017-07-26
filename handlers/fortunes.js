const FORTUNES = `
A programmer is a person who passes as an exacting expert on the basis of being able to turn out, after innumerable punching, an infinite series of incomprehensive answers calculated with micrometric precisions from vague assumptions based on debatable figures taken from inconclusive documents and carried out on instruments of problematical accuracy by persons of dubious reliability and questionable mentality for the avowed purpose of annoying and confounding a hopelessly defenseless department that was unfortunate enough to ask for the information in the first place.
%
Laughter is the closest distance between two people.
%
There was a boy called Eustace Clarence Scrubb, and he almost deserved it.
%
"Where shall I begin, please your Majesty?" he asked. "Begin at the beginning," the King said, gravely, "and go on till you come to the end: then stop."
%
"Yacc" owes much to a most stimulating collection of users, who have goaded me beyond my inclination, and frequently beyond my ability in their endless search for "one more feature". Their irritating unwillingness to learn how to do things my way has usually led to my doing things their way; most of the time, they have been right.
~ S. C. Johnson, "Yacc guide acknowledgements"
%
The great Gaels of Ireland are the men that God made mad,
For all their wars are merry, and all their songs are sad.
%
This was a test of the emergency broadcasting system. Had this been an actual emergency, we would have fled in terror and you would not have been informed.
%
There can be no public or private virtue unless the foundation of all action is the love and practice of truth
%
43rd Law of Computing: Anything that can go wr
\`fortune: Segmentation fault ― core dumped\`
%
A moose once bit my sister.
%
Another good night not to sleep in a eucalyptus tree.
%
Any excuse will serve a tyrant.
%
Any sufficiently advanced bureaucracy is indistinguishable from molasses.
%
If you drop a piece of buttered toast it lands buttered side down
%
Beware of bugs in the above code; I have only proved it correct, not tried it.
%
Beware of Programmers who carry screwdrivers.
%
Bombeck's Rule of Medicine: Never go to a doctor whose office plants have died.
%
An ounce of prevention is worth a pound of cure.
%
A witty saying proves nothing.
%
According to the latest official figures, ${Math.floor(Math.random() * 88)}% of all statistics are totally worthless.
%
All programmers are playwrights and all computers are lousy actors.
%
All things are possible except skiing through a revolving door.
%
All wise men share one trait in common: the ability to listen.
%
Allen's Axiom: When all else fails, read the instructions.
%
A person with one watch knows what time it is; a person with two watches is never sure.
%
A real patriot is the fellow who gets a parking ticket and rejoices that the system works.
%
A sine curve goes off into infinity or at least to the end of the blackboard.
%
A student who changes the course of history is probably taking an exam.
%
A language that doesn't have everything is actually easier to program in than some that do.
%
Drawing on my fine command of language, I said nothing.
%
I don't have any solution but I certainly admire the problem.
%
It's bad luck to be superstitious.
%
Mate, this parrot wouldn't VOOM if you put [four thousand volts through it](https://www.youtube.com/watch?v=4vuW6tQ0218)!
%
Might as well be frank, monsieur. It would take a miracle to get you out of Casablanca and the Germans have outlawed miracles.
%
Nondeterminism means never having to say you are wrong.
%
Of COURSE it's the murder weapon. Who would frame someone with a fake?
%
Stealing a rhinoceros should not be attempted lightly.
%
The society which scorns excellence in plumbing as a humble activity and tolerates shoddiness in philosophy because it is an exaulted activity will have neither good plumbing nor good philosophy ... neither its pipes nor its theories will hold water.
`.split(/\n%\n/g).map(t => t.trim()).filter(s => !!s).map(s => s.indexOf(">") === 0 ? s : '>' + s.split('\n').join('\n>'));

const ICONS = `
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fimage.png?1501040026835
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fcookie.png?1501040330593
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fa-mirror.png?1501040717131
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fa-d6.png?1501040991773
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fa-d20.png?1501040996046
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fan-eight-ball.png?1501041066733
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fa-scroll.png?1501041303790
https://cdn.glitch.com/8568201b-555b-4c6e-8e58-9e525d75d1d7%2Fa-rabbit-foot.png?1501041428601
`.trim().split('\n')

module.exports = function fortuneHandler(request, response) {
  const text = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
  const icon_url = ICONS[Math.floor(Math.random() * ICONS.length)];
  return response.json({
    response_type: 'in_channel',
    text,
    icon_url
  });
}