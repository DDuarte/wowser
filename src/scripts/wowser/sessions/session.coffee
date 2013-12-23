# Denotes a session
class Wowser.sessions.Session

  # Imports
  Config = Wowser.entities.Config

  # Creates a new session for given expansion
  constructor: (expansion, config) ->

    # Ensure the expansion is an instance
    unless expansion instanceof Wowser.expansions.Expansion
      expansion = new expansion()

    # Holds the expansion this session uses
    @expansion = expansion

    # Holds configuration
    @config = config or new Config()

    # Holds the various handlers
    @auth = new expansion.authHandler(@)
    @realms = new expansion.realmHandler(@)
    @world = new expansion.worldHandler(@)
    @characters = new expansion.characterHandler(@)
    @chat = new expansion.chatHandler(@)
