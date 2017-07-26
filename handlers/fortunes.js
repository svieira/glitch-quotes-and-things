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
Bradley's Bromide: If computers get too powerful, we can organize them into a committee. That will do them in.
%
An ounce of prevention is worth a pound of cure.
%
But in our enthusiasm, we could not resist a radical overhaul of the system, in which all of its major weaknesses have been exposed, analyzed, and replaced with new weaknesses.
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
An adventure is only an inconvenience rightly considered. An inconvenience is only an adventure wrongly considered.
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
Captain Penny's Law: You can fool all of the people some of the time, and some of the people all of the time, but you can't fool Mom.
%
Zombie: 100% post-consumer human
%
Diplomacy is the art of extricating oneself from a situation that tact would have prevented in the first place.
%
Do not take life too seriously; you will never get out of it alive.
%
Don't comment bad code: rewrite it.
%
Endless Loop: n., see Loop, Endless.
Loop, Endless: n., see Endless Loop.
%
Entropy isn't what it used to be.
%
Eschew obfuscatory digressiveness.
%
Every program has at least one bug and can be shortened by at least one instruction ― from which, by induction, one can deduce that every program can be reduced to one instruction which doesn't work.
%
Excuse me while I change into something more formidable.
%
Fairy tales do not tell children the dragons exist. Children already know that dragons exist. Fairy tales tell children the dragons can be killed.
%
Fallacies do not cease to be fallacies because they become fashions.
%
A dead thing can go with the stream, but only a living thing can go against it.
%
The act of defending any of the cardinal virtues has today all the exhilaration of a vice.
%
To have a right to do a thing is not at all the same as to be right in doing it.
%
The comedy of man survives the tragedy of man.
%
The free man owns himself. He can damage himself with either eating or drinking; he can ruin himself with gambling. If he does he is certainly a damn fool, and he might possibly be a damned soul; but if he may not, he is not a free man any more than a dog.
%
When we step into the family, by the act of being born, we do step into a world which is incalculable, into a world which has its own strange laws, into a world which could do without us, into a world we have not made. In other words, when we step into the family we step into a fairy-tale.
%
A thing may be too sad to be believed or too wicked to be believed or too good to be believed; but it cannot be too absurd to be believed in this planet of frogs and elephants, of crocodiles and cuttle-fish.
%
Tradition means giving votes to the most obscure of all classes, our ancestors. It is the democracy of the dead. Tradition refuses to submit to that arrogant oligarchy who merely happen to be walking around.
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