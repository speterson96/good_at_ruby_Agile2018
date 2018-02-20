class User < ActiveRecord::Base
  has_many :save_state, dependent: :destroy
  has_many :recipes  
  def self.sign_in_from_omniauth(auth)
    find_by(provider: auth['provider'], uid: auth['uid']) || create_user_from_omniauth(auth)
  end
  
  def self.create_user_from_omniauth(auth)
    create(
      provider: auth['provider'],
      uid: auth['uid'],
      name: auth['info']['name']
      )
  end
  
end