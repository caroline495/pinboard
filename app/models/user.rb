class User < ApplicationRecord
  has_secure_password
  before_validation :ensure_session_token

  # before_validation :add_username

  validates :username, uniqueness: true, length: { in: 3..40 }, format: { without: URI::MailTo::EMAIL_REGEXP, message:  "can't be an email" }
  validates :email, uniqueness: true, length: { in: 3..100 }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :session_token, presence: true, uniqueness: true
  validates :password, length: { in: 6..40 }, allow_nil: true

  has_many :pins,
    foreign_key: :creator_id,
    dependent: :destroy,
    inverse_of: :creator

  def self.find_by_credentials(email, password)  
    user = User.find_by(email: email)
    
    if user && user.authenticate(password) # authenticate comes from has_secure_password
        return user
    else
        return nil
    end

  end

  def reset_session_token!
    self.session_token = generate_unique_session_token 
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= generate_unique_session_token
  end

  private

  def generate_unique_session_token
    loop do 
      session_token = SecureRandom::urlsafe_base64(16)
      return session_token unless User.exists?(session_token: session_token)
    end
  end

  def add_username
    self.username = generate_username
  end

  def generate_username
    loop do 
      username = "user#{Random.rand(10...10000)}"
      return username unless User.exists?(username: username)
    end
  end


end
